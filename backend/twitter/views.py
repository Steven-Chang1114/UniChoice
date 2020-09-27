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


nicknamesDict = utils.generateUniNameDict("./uniName.txt")

# Home page
def homepage(request):
    return render(request, "build/index.html") # react-frontend

# Create your views here.
@api_view(["GET"])
def getHealthIndex(request):
    count = 0
    scoreSum = 0

    anyWord = ["covid", "health", "social distancing", "virus", "safety"]
    collegeName = request.GET.get("text")

    if collegeName in nicknamesDict:
        searchKey = utils.advancedSearch([], any=anyWord.extend(nicknamesDict[collegeName]))
    else:
        searchKey = [collegeName]

    for tweet in tweepy.Cursor(api.search,
                               q = searchKey + " -filter:retweets",
                               rpp=5,
                               lang="en",
                               tweet_mode='extended').items(50):
        text = TextBlob(tweet.full_text)
        scoreSum += text.sentiment.polarity
        count += 1

    if count == 0: 
        avgScore = 0
    else:
        avgScore = scoreSum / count

    return JsonResponse({"score": avgScore});

@api_view(["GET"])
def getMoodIndex(request):
    count = 0
    scoreSum = 0

    #nicknamesDict = utils.generateUniNameDict("./uniName.txt")
    collegeName = request.GET.get("text")
    if collegeName in nicknamesDict:
        searchKey = utils.advancedSearch([], any=nicknamesDict[collegeName])

    else:
        searchKey = [collegeName]

    for tweet in tweepy.Cursor(api.search,
                               q = searchKey + " -filter:retweets",
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
    #nicknamesDict = utils.generateUniNameDict("./uniName.txt")
    collegeName = request.GET.get("text")
    if collegeName in nicknamesDict:
        searchKey = utils.advancedSearch([], any = nicknamesDict[collegeName])
    else:
        searchKey = [collegeName]

    mostPositiveTweetID = ""
    maxPos = -1

    mostNegativeTweetID = ""
    maxNeg = 1

    for tweet in tweepy.Cursor(api.search,
                               q = searchKey + " -filter:retweets",
                               rpp = 5,
                               lang="en",
                               tweet_mode="extended").items(100):
        instance = {}
        text = TextBlob(tweet.full_text)
        instance["timestamp"] = tweet.created_at
        instance["score"] = text.sentiment.polarity
        if (text.sentiment.polarity > maxPos):
            mostPositiveTweetID = tweet.id_str
            maxPos = text.sentiment.polarity

        if (text.sentiment.polarity < maxNeg):
            mostNegativeTweetID = tweet.id_str
            maxNeg = text.sentiment.polarity

        tweets.append(instance)
    #sort the tweets chronologically
    utils.sort_tweet(tweets)

    # for t in tweets:
    #     print(t["timestamp"])

    #split the data in to ten buckets
    bucketAverages = []
    
    for i in range(0, 100, 5):
        bucketSum = 0
        for j in range(i, i+5):
            bucketSum += tweets[j]["score"]
        bucketAvg = bucketSum / 5
        bucketAverages.append(bucketAvg)


    oldScoreSum = 0
    for score in bucketAverages[0:10]:
        oldScoreSum += score
    oldScore = oldScoreSum / 10

    newScoreSum = 0
    for score in bucketAverages[10:20]:
        newScoreSum += score
    newScore = newScoreSum / 10
    change = utils.percent_change(oldScore, newScore)


    return_val = JsonResponse({"score": newScore,
                         "change": change,
                         "historical data": bucketAverages,
                         "positive tweet id": mostPositiveTweetID,
                         "negative tweet id": mostNegativeTweetID});

    print("==============sss===========")
    print("==============sss===========")
    print("==============sss===========")

    return JsonResponse({"score": newScore,
                         "change": change,
                         "historical data": bucketAverages,
                         "positive tweet id": mostPositiveTweetID,
                         "negative tweet id": mostNegativeTweetID});


@api_view(["GET"])
def getHealthIndexAndChange(request):
    tweets = []
    anyWord = ["covid", "health", "social distancing", "virus", "safety"]
    #nicknamesDict = utils.generateUniNameDict("./uniName.txt")
    collegeName = request.GET.get("text")

    if collegeName in nicknamesDict:
        anyWord.extend(nicknamesDict[collegeName]) #debug: if this is in place
        searchKey = utils.advancedSearch([], any = anyWord)
    else:
        searchKey = utils.advancedSearch([collegeName], any = anyWord)

    mostPositiveTweetID = ""
    maxPos = -1

    mostNegativeTweetID = ""
    maxNeg = 1

    for tweet in tweepy.Cursor(api.search,
                               q=searchKey + " -filter:retweets",
                               rpp=5,
                               lang="en",
                               tweet_mode="extended").items(80):
        instance = {}
        text = TextBlob(tweet.full_text)
        instance["timestamp"] = tweet.created_at
        instance["score"] = text.sentiment.polarity
        tweets.append(instance)

        if (text.sentiment.polarity > maxPos):
            mostPositiveTweetID = tweet.id_str
            maxPos = text.sentiment.polarity

        if (text.sentiment.polarity < maxNeg):
            mostNegativeTweetID = tweet.id_str
            maxNeg = text.sentiment.polarity




    # sort the tweets and calculate new score and old score

    utils.sort_tweet(tweets)

    # split the data in to ten buckets
    bucketAverages = []

    for i in range(0, 80, 4):
        bucketSum = 0
        for j in range(i, i+4):
            bucketSum += tweets[j]["score"]
        bucketAvg = bucketSum / 4
        bucketAverages.append(bucketAvg)

    oldScoreSum = 0
    for score in bucketAverages[0:10]:
        oldScoreSum += score
    oldScore = oldScoreSum / 10

    newScoreSum = 0
    for score in bucketAverages[10:20]:
        newScoreSum += score

    newScore = newScoreSum / 10

    change = utils.percent_change(oldScore, newScore)

    print("==============bbb===========")
    print("==============bbb===========")
    print("==============bbb===========")

    return JsonResponse({"score": newScore,
                         "change": change,
                         "historical data": bucketAverages,
                         "positive tweet id": mostPositiveTweetID,
                         "negative tweet id": mostNegativeTweetID})

@api_view(["GET"])
def getOnlineIndexAndChange(request):
    tweets = []
    anyWord = ["zoom", "online", "remote"]
    #nicknamesDict = utils.generateUniNameDict("./uniName.txt")
    collegeName = request.GET.get("text")

    if collegeName in nicknamesDict:
        anyWord.extend(nicknamesDict[collegeName]) #debug: if this is in place
        searchKey = utils.advancedSearch([], any = anyWord)
    else:
        searchKey = utils.advancedSearch([collegeName], any = anyWord)

    mostPositiveTweetID = ""
    maxPos = -1

    mostNegativeTweetID = ""
    maxNeg = 1

    for tweet in tweepy.Cursor(api.search,
                               q=searchKey + " -filter:retweets",
                               rpp=5,
                               lang="en",
                               tweet_mode="extended").items(50):
        instance = {}
        text = TextBlob(tweet.full_text)
        instance["timestamp"] = tweet.created_at
        instance["score"] = text.sentiment.polarity
        tweets.append(instance)

        if (text.sentiment.polarity > maxPos):
            mostPositiveTweetID = tweet.id_str
            maxPos = text.sentiment.polarity

        if (text.sentiment.polarity < maxNeg):
            mostNegativeTweetID = tweet.id_str
            maxNeg = text.sentiment.polarity


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

    print("==============aaa===========")
    print("==============aaa===========")
    print("==============aaa===========")

    change = utils.percent_change(oldScore, newScore)
    return JsonResponse({"score": newScore,
                         "change": change,
                         "positive tweet id": mostPositiveTweetID,
                         "negative tweet id": mostNegativeTweetID})