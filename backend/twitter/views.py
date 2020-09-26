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
import utils

# Twitter
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)

#generate keyword for health index

# Create your views here.
@api_view(["GET"])
def getHealthIndex(request):
    count = 0
    scoreSum = 0

    anyWord = ["covid", "health", "social distancing", "virus", "safety"]
    allWord = request.GET.get("text")

    utils.advancedSearch()

    for tweet in tweepy.Cursor(api.search,
                               q=utils.advancedSearch(allWord, any=anyWord) + " covid" + " -filter:retweets", rpp=5,
                               lang="en",
                               tweet_mode='extended').items(50):
        text = TextBlob(tweet.full_text)
        scoreSum += text.sentiment.polarity
        count += 1

    avgScore = scoreSum / count
    return JsonResponse({"score": avgScore});

@api_view["GET"])


@api_view(["GET"])
def getHealthIndexAndChange(request):
    count = 0
    scoreSum = 0

    anyWord = ["covid", "health", "social distancing", "virus", "safety"]
    allWord = request.GET.get("text")

    utils.advancedSearch()

    for tweet in tweepy.Cursor(api.search, q=utils.advancedSearch(allWord, any = anyWord) + " covid" + " -filter:retweets", rpp=5, lang="en",
                               tweet_mode='extended').items(50):
        text = TextBlob(tweet.full_text)
        scoreSum += text.sentiment.polarity
        count += 1

    avgScore = scoreSum / count
    return JsonResponse({"score": avgScore});