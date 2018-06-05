'use strict';

const express = require('express')
const line = require('@line/bot-sdk');
const linebot = require('linebot');


const bot = linebot({
    channelId: '1541207242',
    channelSecret: '079035c59e264cd788cdff5c72a4575e',
    channelAccessToken: 'TFYUZ7UvrVHPlSJVamwjrq2TnRw+Qeqf7KpN/YU3hOKd12ZoyvJeSUnn06m2j+aTjrY46YzjlHbjFk6gbs1cYWDhTOs8RMx/Co8TEw4jaA87k3VzYOIESWAevIzWULAWmQmjlY23zWXCqR34vq76ggdB04t89/1O/w1cDnyilFU=',
    verify: true // default=true
});

bot.on('message', function (event) {
	event.reply({
		type: 'template',
		altText: 'this is a buttons template',
		template: {
			type: 'buttons',
			thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
			title: 'Menu',
			text: 'Please select',
			actions: [{
				type: 'postback',
				label: 'Buy',
				data: 'action=buy&itemid=123'
			}, {
				type: 'postback',
				label: 'Add to cart',
				data: 'action=add&itemid=123'
			}, {
				type: 'uri',
				label: 'View detail',
				uri: 'http://example.com/page/123'
			}]
		}
	});
});

bot.listen('/linewebhook', process.env.PORT || 80, function () {
	console.log('LineBot is running.');
});