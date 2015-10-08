# Social Radar 

Self-hosted twitt/instagram wall implemented with Node.js 

## Installation

***Requirements***

* Node.js v.10 or later 
* [Redis](http://redis.io)  

Download source code, install dependencies  

```
$ git clone https://github.com/artsoroka/social-radar 
$ cd social-radar
$ npm install 
```

Go to the ```config.js``` file to set up ```PORT```. It will use ```8080``` by default  

Now start the project 

```
$ node app.js 
```

You can use process manager [PM2](https://github.com/Unitech/pm2) if you like 

```
$ pm2 start --name=social-radar app.js  
```

