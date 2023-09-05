import { Request, Response, NextFunction } from 'express'
// const usersService = require('../services/users.service');

function index (_req: Request, res: Response, next: NextFunction): void {
  try {
    console.log(' get users - - - - - - - - - - - - - - - - - -')
    res.json({ response: 'success' })
  } catch (err) {
    const error = err as Error
    console.error('Error while getting users', error.message)
    next(error)
  }
}

/* async function create(_req, res, next) {
  try {
    console.log(' create users - - - - - - - - - - - - - - - - - -')
    // res.json(await usersService.create(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    console.log(' update users - - - - - - - - - - - - - - - - - -')
    // res.json(await usersService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    console.log(' remove users - - - - - - - - - - - - - - - - - -')
    // res.json(await usersService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
} */

export default {
  index
  /* create,
  update,
  remove */
}
