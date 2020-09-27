import sys
sys.path.append('./twitter')
import utils
from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers
from django.conf import settings
import json
from flask import jsonify
import tweepy
# from keras.models import load_model
# from keras.preprocessing.sequence import pad_sequences
# from keras.preprocessing.text import Tokenizer
from textblob import TextBlob
import pickle
# import tensorflow as tf
from .config import consumer_key, consumer_secret, access_token, access_token_secret

# # Keras stuff
# global graph
# graph = tf.get_default_graph()
# model = load_model('main_app/Sentiment_LSTM_model.h5') # bug here
# MAX_SEQUENCE_LENGTH = 300

# Alternative: TextBlob


# Twitter
try:
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth,wait_on_rate_limit=True)
except Exception as inst:
    print(inst)

# # loading tokenizer
# with open('main_app/tokenizer.pickle', 'rb') as handle:
#     tokenizer = pickle.load(handle)

# def predict(text, include_neutral=True):
#     # Tokenize text
#     x_test = pad_sequences(tokenizer.texts_to_sequences([text]), maxlen=MAX_SEQUENCE_LENGTH)
#     # Predict
#     score = model.predict([x_test])[0]
#     if(score >=0.4 and score<=0.6):
#         label = "Neutral"
#     if(score <=0.4):
#         label = "Negative"
#     if(score >=0.6):
#         label = "Positive"

#     return {"label" : label,
#         "score": float(score)} 

# Home page
def homepage(request):
    return render(request, "build/index.html") # react-frontend

# @api_view(["GET"])
# def getsentiment(request):
#     data = {"success": False}
#     # if parameters are found, echo the msg parameter 
#     if (request.data != None):  
#         with graph.as_default():
#             data["predictions"] = predict(request.GET.get("text"))
#         data["success"] = True
#     return JsonResponse(data)

# this is where you analyze the tweet sentiment 
# TODO: change it to textblob
@api_view(["GET"])
def analyzehashtag(request):
    positive = 0
    neutral = 0
    negative = 0
    count = 0

    try:
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth,wait_on_rate_limit=True)
        # print(api)
    except Exception as inst:
        print(inst)

    # print(request.GET.get("text")) # also works

    try:
        for tweet in tweepy.Cursor(api.search, q=request.GET.get("text") + " -filter:retweets",rpp=10,lang="en", tweet_mode='extended').items(100):
            # Keras: for each tweet, predict if its positive/neutral/negative
            # with graph.as_default():
            #     prediction = predict(tweet.full_text)
            # print(tweet.created_at)
            count += 1
            text = TextBlob(tweet.full_text)
            # print(text.sentiment)
            # print(text.sentiment.polarity)

            if(text.sentiment.polarity > 0):
                positive += 1
            if(text.sentiment.polarity == 0):
                neutral += 1
            if(text.sentiment.polarity < 0):
                negative += 1
    except Exception as inst:
        print(inst)
    
    # print('=============================== count is:', count, " ============================")
    # print(JsonResponse({"positive": positive, "neutral": neutral, "negative": negative}))
    return JsonResponse({"positive": positive, "neutral": neutral, "negative": negative});

# @api_view(["GET"])
# def gettweets(request):
#     tweets = []
#     for tweet in tweepy.Cursor(api.search,q="#" + request.GET.get("text") + " -filter:retweets",rpp=5,lang="en", tweet_mode='extended').items(50):
#         temp = {}
#         temp["text"] = tweet.full_text
#         temp["username"] = tweet.user.screen_name
#         # with graph.as_default():
#         #     prediction = predict(tweet.full_text)
#         temp["label"] = prediction["label"]
#         temp["score"] = prediction["score"]
#         tweets.append(temp)
#     return JsonResponse({"results": tweets});

#generate keyword for health index

# Create your views here.
@api_view(["GET"])
def getHealthIndex(request):
    count = 0
    scoreSum = 0

    # print('================================ Entered here =====================================')

    anyWord = ["covid", "health", "social distancing", "virus", "safety"]
    allWord = request.GET.get("text")

    for tweet in tweepy.Cursor(api.search,
                               q=utils.advancedSearch(allWord, any=anyWord) + " -filter:retweets",
                               rpp=5,
                               lang="en",
                               tweet_mode='extended').items(50):
        text = TextBlob(tweet.full_text)
        scoreSum += text.sentiment.polarity
        count += 1
        print('========================= uc berkeley guo qi =========================')

    if count == 0: 
        avgScore = 0
    else:
        avgScore = scoreSum / count

    print('====================== getHealthIndex:', avgScore, " ==================")
    return JsonResponse({"score": avgScore});

@api_view(["GET"])
def getMoodIndex(request):
    count = 0
    scoreSum = 0
    for tweet in tweepy.Cursor(api.search,
                               q = request.GET.get("text") + " -filter:retweets",
                               rpp = 5,
                               lang="en",
                               tweet_mode="extended").items(200):
        text = TextBlob(tweet.full_text)
        scoreSum += text.sentiment.polarity
        count += 1

    if count == 0: 
        avgScore = 0
    else:
        avgScore = scoreSum / count

    print('====================== getMoodIndex:', avgScore, " ======================")
    return JsonResponse({"score": avgScore});


@api_view(["GET"])
def getMoodIndexAndChange(request):
    # count = 0
    # scoreSum = 0
    tweets = []
    for tweet in tweepy.Cursor(api.search,
                               q = request.GET.get("text") + " -filter:retweets",
                               rpp = 5,
                               lang="en",
                               tweet_mode="extended").items(200):
        instance = {}
        text = TextBlob(tweet.full_text)
        instance["timestamp"] = tweet.created_at
        instance["score"] = text.sentiment.polarity
        tweets.append(instance)


    #sort the tweets and calculate new score and old score

    utils.sort_tweet(tweets)
    oldScoreSum = 0
    for instance in tweets[0:100]:
        oldScoreSum += instance["score"]
    oldScore = oldScoreSum / 100

    count = 0
    newScoreSum = 0
    for instance in tweets[100:]:
        newScoreSum += instance["score"]
        count += 1

    if count == 0: 
        newScore = 0
    else:
        newScore = newScoreSum / count

    change = utils.percent_change(oldScore, newScore)\

    print('=============== getMoodIndexAndChange:', newScore, 'getMoodIndexAndChange', change, " ===============")
    return JsonResponse({"score": newScore, "change": change});


@api_view(["GET"])
def getHealthIndexAndChange(request):
    tweets = []
    anyWord = ["covid", "health", "social distancing", "virus", "safety"]
    allWord = request.GET.get("text")
    for tweet in tweepy.Cursor(api.search,
                               q=utils.advancedSearch(allWord, any=anyWord) + " -filter:retweets",
                               rpp=5,
                               lang="en",
                               tweet_mode="extended").items(200):
        instance = {}
        text = TextBlob(tweet.full_text)
        instance["timestamp"] = tweet.created_at
        instance["score"] = text.sentiment.polarity
        tweets.append(instance)

    # sort the tweets and calculate new score and old score

    utils.sort_tweet(tweets)
    oldScoreSum = 0
    for instance in tweets[0:100]:
        oldScoreSum += instance["score"]
    oldScore = oldScoreSum / 100

    count = 0
    newScoreSum = 0
    for instance in tweets[100:]:
        newScoreSum += instance["score"]
        count += 1

    if count == 0: 
        newScore = 0
    else:
        newScore = newScoreSum / count

    change = utils.percent_change(oldScore, newScore)

    # print(type(change))

    print('================ getHealthIndexAndChange:', newScore, 'getHealthIndexAndChange:', change, " =================")
    return JsonResponse({"score": newScore, "change": change})