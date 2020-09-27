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
from textblob import TextBlob
import pickle
from .config import consumer_key, consumer_secret, access_token, access_token_secret

# Twitter
try:
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth,wait_on_rate_limit=True)
except Exception as inst:
    print(inst)


# Home page
def homepage(request):
    return render(request, "build/index.html") # react-frontend

# Create your views here.
@api_view(["GET"])
def getHealthIndex(request):
    count = 0
    scoreSum = 0
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
    return JsonResponse({"score": avgScore});


@api_view(["GET"])
def getMoodIndexAndChange(request):
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

    change = utils.percent_change(oldScore, newScore)
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
                               tweet_mode="extended").items(80):
        instance = {}
        text = TextBlob(tweet.full_text)
        instance["timestamp"] = tweet.created_at
        instance["score"] = text.sentiment.polarity
        tweets.append(instance)

    # sort the tweets and calculate new score and old score

    utils.sort_tweet(tweets)
    oldScoreSum = 0
    for instance in tweets[0:40]:
        oldScoreSum += instance["score"]
    oldScore = oldScoreSum / 40

    count = 0
    newScoreSum = 0
    for instance in tweets[40:]:
        newScoreSum += instance["score"]
        count += 1

    if count == 0: 
        newScore = 0
    else:
        newScore = newScoreSum / count

    change = utils.percent_change(oldScore, newScore)
    return JsonResponse({"score": newScore, "change": change})

@api_view(["GET"])
def getOnlineIndexAndChange(request):
    tweets = []
    anyWord = ["zoom", "online", "remote"]
    allWord = request.GET.get("text")
    for tweet in tweepy.Cursor(api.search,
                               q=utils.advancedSearch(allWord, any=anyWord) + " -filter:retweets",
                               rpp=5,
                               lang="en",
                               tweet_mode="extended").items(50):
        instance = {}
        text = TextBlob(tweet.full_text)
        instance["timestamp"] = tweet.created_at
        instance["score"] = text.sentiment.polarity
        tweets.append(instance)

    utils.sort_tweet(tweets)
    oldScoreSum = 0
    for instance in tweets[0:25]:
        oldScoreSum += instance["score"]
    oldScore = oldScoreSum / 25

    count = 0
    newScoreSum = 0
    for instance in tweets[25:]:
        newScoreSum += instance["score"]
        count += 1

    if count == 0:
        newScore = 0
    else:
        newScore = newScoreSum / count

    change = utils.percent_change(oldScore, newScore)
    return JsonResponse({"score": newScore, "change": change})






