# Bearer Proxy

Bearer Proxy is a simple HTTP proxy server that adds an Authorization header to outgoing requests. This can be useful for testing or development environments where you need to forward requests with an authentication token.

## Installation

To install Bearer Proxy from the NPM repository, run the following command:

```bash
npm install -g bearer-proxy
```

## Usage

To start the proxy server, use the following command:

```bash
bearer-proxy --token <YOUR_AUTH_TOKEN> --target <TARGET_URL> [--port <LISTEN_PORT>]
```

### Options

- `--token, -t`: (Required) The authentication token to be added to the `Authorization` header.
- `--target, -u`: (Required) The target URL to which the requests should be forwarded.
- `--port, -p`: (Optional) The port on which the proxy server will listen. Default is `8000`.

### Examples

```bash
bearer-proxy --token mysecrettoken --target http://example.com --port 8080
```

This command will start the proxy server on port `8080` and forward all requests to `http://example.com` with the `Authorization: Bearer mysecrettoken` header.

```bash
TOKEN=$(oc whoami -t)
TARGET=https://forklift-inventory-openshift-mtv.apps-crc.testing

bearer-proxy --token "$TOKEN" --target "$TARGET" --port 8080

INVENTORY_SERVER_HOST=http://127.0.0.1:8080
```

This example will add an Openshit bearer token to the forklift inventory service.

## License

This project is licensed under the GPL-3.0 License.