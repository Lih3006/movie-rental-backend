import express, { Application, json } from 'express';
import logics from './logics';
import { startDatabase } from './database';
import middlewares from './middlewares';

const app: Application = express();
app.use(json());

app.post('/movies', middlewares.verifyNewMovieNameExists, logics.createMovie);

app.get('/movies', logics.getAllMovies);

app.get('/movies/:id', middlewares.verifyMovieIdExists, logics.getMovieById);

app.patch(
  '/movies/:id',
  middlewares.verifyMovieIdExists,
  middlewares.verifyNewMovieNameExists,
  logics.updateMovie
);

app.delete('/movies/:id', middlewares.verifyMovieIdExists, logics.deletMovie);

const PORT: number = 3000;
const runningMsg: string = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, async () => {
  await startDatabase();
  console.log(runningMsg);
});
