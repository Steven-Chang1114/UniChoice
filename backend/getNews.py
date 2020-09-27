# import nltk
#config will allow us to access the specified url for which we are #not authorized. Sometimes we may get 403 client error while parsing #the link to download the article.
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')


def getPolarity(uniName):
    from GoogleNews import GoogleNews
    from newspaper import Article
    from newspaper import Config
    import pandas as pd
    from textblob import TextBlob

    uniName = uniName + ' Coronavirus'
    user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    config = Config()
    config.browser_user_agent = user_agent
    googlenews = GoogleNews(start='08/01/2020', end='09/26/2020')
    googlenews.search(uniName)
    result = googlenews.result()

    for i in range(0,5):
        googlenews.getpage(i)
        result = googlenews.result()
    df = pd.DataFrame(result)
    sum = 0
    counter = 1
    for ind in df.index:
        try:
            article = Article(df['link'][ind], config=config)
            article.download()
            article.parse()
            article.nlp()
            testimonial = TextBlob(article.summary)
            counter += 1
            sum+=testimonial.sentiment.polarity
        except:
            pass

    return sum / counter

print(getPolarity('edinburgh university'))
