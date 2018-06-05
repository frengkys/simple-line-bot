'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
require('dotenv').config();

// create LINE SDK config from env variables
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

// create LINE SDK client
const client = new line.Client(config);

const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.get('/', (req, res) => {
    res.json({message: 'haiii'});  
});

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleProfile))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };
  console.log(event);
  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

function handleProfile(params) {
    console.log('params : ', params);
    client.getProfile(params.source.userId)
    .then((profile) => {

      const message = {
        type: 'text',
        text: 'Haiii '+profile.displayName
      };
      
      client.replyMessage(params.replyToken, message);
    })
    .catch((error) => {
      console.log('err ', error);
      // error handling
    });
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});