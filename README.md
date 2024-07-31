# BearerProxy

BearerProxy is a Node.js-based proxy server that forwards HTTP requests to a specified target URL with a Bearer token for authorization.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Usage

Start the server with the following command:

```bash
node bearerProxy.js --port 8080 --token your_bearer_token --target https://target-api.com
```

## Command-Line Arguments
  - `--port`, `-p`: Port to run the server on (default: 8080).
  - `--token`, `-t`: Bearer token for authorization (required).
  - `--target`, `-u`: Target URL prefix to which requests are forwarded (required).
