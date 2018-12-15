import clientStats from 'dist/stats.json';
import express from 'express';
import renderer from './renderer';

const server = express();

server.use(express.static('dist'));

server.use(renderer({ clientStats }));

server.listen(3000, () => {
  console.log(`Production server is listening on port 3000.`);
});
