import express from 'express';
import clientStats from 'dist/stats.json';
import renderer from './renderer';

const app = express();

app.use(express.static('dist'));

app.use(renderer({ clientStats }));

app.listen(3000, () => {
  console.log(`Production server is listening on port 3000.`);
});
