# COVID-UniSelector


### Usage

#### Front-end
```
npm install
npm run start
```

#### Back-end

Here is a list of dependencies you need to install in order to successfully run our backend framework locally. We recommend using pip install

```
psycopg2
django-heroku
djangorestframework
django-cors-headers
textblob
flask
tweepy
numpy
postgresql
```

We recommend using a virtual background when running our backend. To create and activate a virtual background, type in your command line:

```
python3 -m venv <your env name>
source <your env name>/bin/activate
```


## Inspiration
The instruction policy of colleges worldwide has been profoundly changed by the recent public health events regarding COVID-19. With online learning and remote instruction becoming the norm, many high school students need to make their choices wisely in order to have a fruitful semester without the risk of being exposed to the disease. In other words, how universities are staying positive and reacting properly reflects the quality of life students are going to have this year.

Inspired by college ranking websites such as niche.com. We created a website that monitors the physical wellbeing and overall campus health index of universities around the world.

## What it does
Our website includes every university on the planet and their relevant statistics regarding positivity, health protocol and quality of online education. We fetch the relevant news and tweets of the schools of your interest. These news and tweets containing information regarding public health and online education are then fed into our **NLP** model language analysis. We then create a score for each of the index based on the output of our model. We believe this provides straight-forwarded, visualized insight for college applicants to evaluate the schools they are planning to commit to.

## How I built it
We use **Reactjs** for front-end, particularly the search bar and the data visualisation dashboard. We fetch data from our **django** backend, which is responsible for requesting and integrating all sorts of APIs from **Azure**, **Twitter** and **Google Cloud**

Our machine learning model is built by **Tensorflow**
Front-end is deployed by **Azure**

## What's next for UniChoice
We will integrate more functionality such as user login and signup. Users will be able to add their dream school and compare their dream school with other colleges. Meanwhile, we can release our trending page to rank colleges from the most positive reacting to the least positive.
