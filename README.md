# Ping Slack Bot

This is an ultra simple slack bot that checks how long it takes a website to respond.

It is meant to run serverless using AWS [API Gateway](https://aws.amazon.com/api-gateway/) and [Lambda](https://aws.amazon.com/lambda/). I use [Up](https://github.com/apex/up) to make my life easier.

## Tutorial
You can find an actual walk through of the tutorial and a coupon for Up (50% off forever) here: [https://pagertree.com/2018/03/21/serverless-part-4-serverless-tools-and-best-practices/](https://pagertree.com/2018/03/21/serverless-part-4-serverless-tools-and-best-practices/)

## Building & Deployment

`npm install`

`up deploy production`

## Security

To add security to your bot make sure to add the `TOKEN` environment variable in the `up.json` file. This will perform the Slack request authentication.
