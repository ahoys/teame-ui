const request = require('superagent');
const ls = require('logscribe').default('routes', '\x1b[32m');
const wls = require('logscribe').default('routes', '\x1b[31m');
const bodyParser = require('body-parser');

/**
 * Logs communication errors for
 * futher examination and responds to the client.
 * @param {object} responseForClient - Response for the client.
 * @param {object} backendError - The error response object.
 */
const handleFailedRequest = (responseForClient, backendError) => {
  try {
    // A response for the client.
    responseForClient
      .status(backendError.status || 500)
      .send();
    if (process.env.NODE_ENV === 'development') {
      // In development we want more information.
      wls.print(
        backendError.response.req.method,
        backendError.response.req.path,
        '->',
        backendError.status
      );
      wls.log(backendError.response.error);
    }
  } catch (e) {
    return;
  }
}

/**
 * Handles the backend response to the client.
 * @param {*} responseForClient - Response for the client.
 * @param {*} backendResponse - Back-end given response.
 */
const handleSuccessfulRequest = (method, responseForClient, backendResponse) => {
  try {
    if (method === 'GET') {
      // GET has always a body.
      responseForClient
        .status(200)
        .send(backendResponse.body);
    } else if (method === 'POST') {
      // GraphQL requests have a body attached to them.
      responseForClient
        .status(200)
        .send(JSON.parse(backendResponse.text));
    } else {
      // Other methods only return OK.
      responseForClient
        .status(200)
        .send();
    }
  } catch (e) {
    return;
  }
}

/**
 * For printing out our requests when in the development mode.
 * @param {object} clientRequest - Request of the client.
 * @param {object} responseForClient - Response for the client.
 * @param {object} next - Moves to the next middleware.
 */
const all = (clientRequest, responseForClient, next) => {
  try {
    if (clientRequest.method === 'POST') {
      ls.print(clientRequest.method, clientRequest.url, clientRequest.body)
    } else {
      ls.print(clientRequest.method, clientRequest.url)
    }
    next();
  } catch (e) {
    next();
  }
}

/**
 * Uses Basic Auth to log in.
 * @param {object} clientRequest - Request of the client.
 * @param {object} responseForClient - Response for the client.
 */
const login = (clientRequest, responseForClient) => {
  request
    .get('http://localhost:8080/login')
    .set('Authorization', clientRequest.headers.authorization)
    .end((backendError, backendResponse) => {
      if (backendError) {
        handleFailedRequest(responseForClient, backendError);
      } else {
        handleSuccessfulRequest(
          backendResponse.req.method,
          responseForClient,
          backendResponse
        );
      }
    });
};

const graphql = (clientRequest, responseForClient) => {
  request
    .post('http://localhost:8080/graphql')
    .set('Content-Type', 'text/plain; charset=UTF-8')
    .accept('text/plain; charset=UTF-8')
    .set('teameToken', clientRequest.headers.token)
    .send(clientRequest.body)
    .end((backendError, backendResponse) => {
      if (backendError) {
        handleFailedRequest(responseForClient, backendError);
      } else {
        handleSuccessfulRequest(
          backendResponse.req.method,
          responseForClient,
          backendResponse
        );
      }
    });
}

/**
 * Lists and maps all routes available for the client.
 * @param {object} server - An Express.js server.
 */
const setRoutesForServer = (server) => {
  // Parse application/json.
  server.use(bodyParser.text({
    type: 'text/plain'
  }));
  if (process.env.NODE_ENV === 'development') {
    // Development helper middleware(s).
    server.get('*', (clientRequest, responseForClient, next) =>
      all(clientRequest, responseForClient, next));
    server.post('*', (clientRequest, responseForClient, next) =>
      all(clientRequest, responseForClient, next));
  }
  server.get('/login', (clientRequest, responseForClient) =>
    login(clientRequest, responseForClient));
  server.post('/graphql', (clientRequest, responseForClient) =>
    graphql(clientRequest, responseForClient));
};

module.exports = setRoutesForServer;
