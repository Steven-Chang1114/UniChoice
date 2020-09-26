# in-place sort tweets by their timestamp, in ascending order from oldest to latest
def sort_tweet(tweet_list, descending = True):
    tweet_list.sort(reverse = descending, key = lambda tweet: tweet["timestamp"])

#generate a string for the twitter api to search tweet. Note this is advanced search
def advancedSearch(allOf, exact = None, any = None, none = None):
    if allOf is None:
        raise Exception("keyword cannot be empty")

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
