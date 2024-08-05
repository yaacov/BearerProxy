#!/usr/bin/env node

var http = require('http');
var https = require('https');
var httpProxy = require('http-proxy');
var yargs = require('yargs/yargs');
var { hideBin } = require('yargs/helpers');

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
    .option('token', {
        alias: 't',
        description: 'Authentication token',
        type: 'string',
        demandOption: true
    })
    .option('target', {
        alias: 'u',
        description: 'Target URL',
        type: 'string',
        demandOption: true
    })
    .option('port', {
        alias: 'p',
        description: 'Listen port',
        type: 'number',
        default: 8000
    })
    .help()
    .alias('help', 'h')
    .argv;

var proxy = httpProxy.createProxyServer({
    target: argv.target,
    changeOrigin: true,
    secure: false // If the target is self-signed
});

http.createServer(function (req, res) {
    req.headers['Authorization'] = `Bearer ${argv.token}`;
    proxy.web(req, res);
}).listen(argv.port, () => {
    console.log(`Proxy server is running on http://127.0.0.1:${argv.port}`);
});
