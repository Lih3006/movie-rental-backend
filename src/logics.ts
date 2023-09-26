import { Request, Response } from 'express';
import { Movie, MovieCreate, MovieResult, MovieUpdate } from './interfaces';
import { client } from './database';
import format from 'pg-format';
import { QueryConfig, QueryResult } from 'pg';

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload: MovieCreate = req.body;
  const queryFormat: string = format(
    '  INSERT INTO movies (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult = await client.query(queryFormat);
  const movie: Movie = queryResult.rows[0];

  return res.status(201).json(movie);
};

const getAllMovies = async (req: Request, res: Response): Promise<Response> => {
  const { category } = req.query;
  const queryString: string = `SELECT * FROM movies WHERE category LIKE '%${category}%';`;
  const queryResult: MovieResult = await client.query(queryString);
  const queryReturn = queryResult.rows.length;

  if (queryReturn === 0) {
    const queryString: string = 'SELECT * FROM movies;';
    const queryResult: MovieResult = await client.query(queryString);
    return res.status(200).json(queryResult.rows);
  }

  return res.status(200).json(queryResult.rows);
};

const getMovieById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const queryString: string = `SELECT * FROM movies WHERE id=${id};`;
  const queryResult: MovieResult = await client.query(queryString);

  return res.status(200).json(queryResult.rows[0]);
};

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const { body, params } = req;
  const updateColumns: string[] = Object.keys(body);
  const updateValues: string[] = Object.values(body);
  const queryString: string = `UPDATE movies SET (%I)= ROW(%L) WHERE id= $1 RETURNING *;`;

  const queryFormat: string = format(queryString, updateColumns, updateValues);

  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [params.id],
  };

  const queryResult: MovieResult = await client.query(queryConfig);
  const updatedMovie: MovieUpdate = queryResult.rows[0];

  return res.status(200).json(updatedMovie);
};

const deletMovie = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const queryString: string = `DELETE FROM movies WHERE id=${id} RETURNING *;`;
  const queryResult: MovieResult = await client.query(queryString);

  return res.status(204).json(queryResult.rows);
};

export default {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deletMovie,
};
