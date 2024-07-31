#!/usr/bin/env node

const express = require('express');
const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const https = require('https');

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
    .option('port', {
        alias: 'p',
        type: 'number',
        description: 'Port to run the proxy server on',
        default: 8080
    })
    .option('token', {
        alias: 't',
        type: 'string',
        description: 'Bearer token for authorization',
        demandOption: true
    })
    .option('target', {
        alias: 'u',
        type: 'string',
        description: 'Target URL prefix to which requests are forwarded',
        demandOption: true
    })
    .help()
    .alias('help', 'h')
    .argv;

const app = express();

const PORT = argv.port;
const BEARER_TOKEN = argv.token;
const TARGET_URL_PREFIX = argv.target;

/**
 * Create an https agent that ignores SSL/TLS certificate verification
 */ 
const httpsAgent = new https.Agent({
    rejectUnauthorized: false // Disable SSL/TLS certificate verification
});

/**
 * Middleware to parse JSON requests.
 */
app.use(express.json());

/**
 * Proxy endpoint that forwards requests to the target URL with a Bearer token.
 * 
 * The endpoint listens for any request made to the path /proxy/* and forwards it to the
 * corresponding path at the TARGET_URL_PREFIX, adding the Bearer token to the Authorization header.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.use('/proxy/*', async (req, res) => {
    try {
        const targetUrl = `${TARGET_URL_PREFIX}${req.originalUrl.replace('/proxy', '')}`;
        const parsedUrl = new URL(targetUrl);

        const response = await axios({
            method: req.method,
            url: targetUrl,
            headers: {
                ...req.headers,
                'Host': parsedUrl.host,  // Update the Host header
                'Authorization': `Bearer ${BEARER_TOKEN}`
            },
            data: req.body,
            httpsAgent,
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

/**
 * Start the server on the specified port.
 */
app.listen(PORT, () => {
    console.log(`BearerProxy server running on port ${PORT}`);
});
