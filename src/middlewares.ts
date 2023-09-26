import { NextFunction, Request, Response } from 'express';
import { client } from './database';
import { MovieResult } from './interfaces';
import { QueryConfig } from 'pg';

const verifyMovieIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = req.params;
  const queryString: string = `SELECT * FROM movies WHERE id=${id};`;
  const queryResult: MovieResult = await client.query(queryString);
  const queryReturn = queryResult.rows.length;

  if (queryReturn === 0) {
    const error: string = 'Movie not found!';
    return res.status(404).json({ error });
  }

  return next();
};

const verifyNewMovieNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = req.body;
  const queryString: string = `SELECT * FROM movies WHERE name=$1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name],
  };
  const queryResult: MovieResult = await client.query(queryConfig);
  const queryReturn = queryResult.rows[0];

  if (queryReturn) {
    const error: string = `Movie name: ${name} already exists!`;
    return res.status(409).json({ error });
  }

  return next();
};

export default { verifyMovieIdExists, verifyNewMovieNameExists };
