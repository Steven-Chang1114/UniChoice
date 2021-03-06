import numpy as np
import json
from datetime import datetime
import sys
sys.path.append('./twitter')

# in-place sort tweets by their timestamp, in ascending order from oldest to latest
def sort_tweet(tweet_list, descending=True):
    tweet_list.sort(reverse = descending, key = lambda tweet: tweet["timestamp"])

#generate a string for the twitter api to search tweet. Note this is advanced search
def advancedSearch(allOf, exact = None, any = None, none = None):
    if type(allOf)is not list:
        raise Exception("keyword has to be list")

    string1 = ""
    for keyword in allOf:
        if type(keyword) is not str:
            raise Exception("keyword must be string be empty")
        string1 += keyword + " "

    if exact:
        string1 += "\""
        for keyword in exact:
            if type(keyword) is not str:
                raise Exception("keyword must be string be empty")
            string1 += keyword + " "
        string1 = string1[0:-1]
        string1 += "\" "

    if any:
        string1 += "("
        for keyword in any:
            if type(keyword) is not str:
                raise Exception("keyword must be string be empty")
            string1 += keyword + " OR "
        string1 = string1[0:-4]
        string1 += ")"

    if none:
        for keyword in none:
            if type(keyword) is not str:
                raise Exception("keyword must be string be empty")
            string1 += (" -" + keyword)

    return string1

def percent_change(old, new):

    if old == -1:
        return 0

    return np.round(((new-old) / (old+1) * 100, 2))[0]


# generate a json file with colleges' official name as key and the colloqial name as value
def generateUniNameDict(filepath):

    #debug

    with open(filepath, 'r') as f:
        content = f.readlines()
    dictionary = {}
    for line in content:
        wordList = line.split(" " + "–" + " ")
        if len(wordList) == 2:
            officialName = wordList[1].strip("\n")
            if (officialName[0:25] == "University of California,"):
                officialNameList = [officialName]
            else:
                officialNameList = officialName.split(", ")
            nickName = wordList[0]
            for name in officialNameList:
                if name in dictionary:
                    dictionary[name].append(nickName)
                else:
                    dictionary[name] = [nickName]

    # jsonFile = json.dumps(dictionary)
    return dictionary