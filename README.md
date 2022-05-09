# Next Session Client
[![CircleCI](https://circleci.com/gh/Financial-Times/next-session-client/tree/main.svg?style=svg)](https://circleci.com/gh/Financial-Times/next-session-client/tree/main)

A client for working with the [Next Session service](https://github.com/Financial-Times/next-session).

**Note**: this module is for **client side usage only**; if working from the server, talk to the [Membership Session service](https://developer.ft.com/docs/membership_platform_api) directly.

## Installing

	npm i --save next-session-client


## Usage

	const session = require('next-session-client');

    // get the user's uuid from their session
	session.uuid()
        .then(({ uuid }) => {
    		// uuid is `undefined` if session isn't valid
    	});

	// get user's products
	session.products()
        .then(({ products, uuid }) => {
        });

	// get (secure) session id
	const sessionId = session.sessionId();
