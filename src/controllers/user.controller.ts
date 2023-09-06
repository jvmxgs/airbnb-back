import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
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

function create (req: Request, res: Response, next: NextFunction): void {
  try {
    const { fullName, birthDate, email, password, role } = req.body
    const newUser = new User({ fullName, birthDate, email, password, role })
    newUser.save()
      .then(() => {
        res.status(201).json({ message: 'User registered successfully' })
      })
      .catch((error) => {
        next(error)
      })
  } catch (err) {
    const error = err as Error
    console.error('Error while creating programming language', error.message)
    next(error)
  }
}

/*
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
  index,
  create
  /* create,
  update,
  remove */
}
