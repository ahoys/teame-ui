import clientStats from 'dist/stats.json';
import express from 'express';
import { setLogDirPath } from 'logscribe';
import renderer from './renderer';
import setRoutesForServer from './routes';

// Set path for log-files.
setLogDirPath('./');

const server = express();
setRoutesForServer(server);

server.use(express.static('dist'));

server.use(renderer({ clientStats }));

server.listen(3000, () => {
  console.log(`Production server is listening on port 3000.`);
});
