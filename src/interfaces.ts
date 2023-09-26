import { QueryResult } from 'pg';

interface Movie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

type MovieCreate = Omit<Movie, 'id'>;
type MovieResult = QueryResult<Movie>;
type MovieUpdate = Partial<MovieCreate>;

export { Movie, MovieCreate, MovieResult, MovieUpdate };
