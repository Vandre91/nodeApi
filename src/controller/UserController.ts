import bcrypt = require('bcrypt-nodejs');
import { Request, Response } from 'express';
import User from '../models/User';
import AuthenticationController from './AuthenticationController';

export default class UserController {
  public authController;
  constructor() {
    this.authController = new AuthenticationController();
  }

  public findAll(req: Request, res: Response): void {
    if (this.authController.authenticateBefore(req).status) {
      User.find()
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    } else {
      res.status(401).json({
        success: false,
        message: 'No token provided.'
      });
    }
  }

  public findOne(req: Request, res: Response): void {
    if (this.authController.authenticateBefore(req).status) {
      const username: string = req.params.username;
      User.findOne({ username })
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    } else {
      res.status(401).json({
        success: false,
        message: 'No token provided.'
      });
    }
  }

  public create(req: Request, res: Response): void {
    if (this.authController.authenticateBefore(req).status) {
      const firstName: string = req.body.firstName;
      const lastName: string = req.body.lastName;
      const username: string = req.body.username;
      const email: string = req.body.email;
      const password: string = bcrypt.hashSync(req.body.password);
      const user = new User({
        email,
        firstName,
        lastName,
        password,
        username
      });
      user.save()
        .then((data) => {
          res.status(201).json({ data });
        }).catch((error) => {
          res.status(500).json({ error });
        });
    } else {
      res.status(401).json({
        success: false,
        message: 'No token provided.'
      });
    }
  }

  public update(req: Request, res: Response): void {
    if (this.authController.authenticateBefore(req).status) {
      const username: string = req.params.username;
      const updatedAt: Date = new Date();
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password);
      }
      User.findOneAndUpdate({ username }, { ...req.body, updatedAt }, { new: true })
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    } else {
      res.status(401).json({
        success: false,
        message: 'No token provided.'
      });
    }
  }

  public delete(req: Request, res: Response): void {
    if (this.authController.authenticateBefore(req).status) {
      const username: string = req.params.username;
      User.findOneAndRemove({ username })
        .then(() => {
          res.status(204).end();
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    } else {
      res.status(401).json({
        success: false,
        message: 'No token provided.'
      });
    }
  }
}