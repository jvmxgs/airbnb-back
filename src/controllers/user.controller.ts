import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import i18n from 'i18n'
// const usersService = require('../services/users.service');

function index (_req: Request, res: Response, next: NextFunction): void {
  try {
    res.json({ response: 'success' })
  } catch (err) {
    const error = err as Error
    console.error('Error while getting users', error.message)
    next(error)
  }
}

function create (req: Request, res: Response, next: NextFunction): void {
  const { fullName, birthDate, email, password, role } = req.body

  const newUser = new User({ fullName, birthDate, email, password, role })

  newUser.save()
    .then(() => {
      res.status(201).json({ message: i18n.__('users.created') })
    })
    .catch((error) => {
      if (error.code === 11000 && 'email' in error?.keyPattern) {
        res.status(400).json({ message: i18n.__('users.email_in_use') })
        return
      }

      next(error)
    })
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
