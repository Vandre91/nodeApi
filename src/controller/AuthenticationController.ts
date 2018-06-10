import bcrypt = require('bcrypt-nodejs');
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Promise } from 'mongoose';
import User from '../models/User';
import utils from '../utils/utils';

export default class AuthenticationController {
  public authenticate(req: Request, res: Response, secretKey: string) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          res.json({ success: true, message: 'Enjoy your token!', token: decoded });
        }
      });
    } else if (req.body.username) {
      User.findOne({ username: req.body.username }, (err: Error, user: any) => {
        if (err) {
          res.status(403).send({ succes: false, err });
        } else if (!user) {
          res.status(403).send({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
            res.json({
              message: 'Enjoy your token!',
              success: true,
              token: jwt.sign({ username: user.username, id: user._id, firstName: user.firstName, lastName: user.lastName }, secretKey, { expiresIn: 86400 })
            });
          }
        }
      });
    } else {
      res.json({
        message: 'No name!',
        succes: false,
      });
    }
  }

  public authenticateBefore(req: Request) {
    const token = req.body.token || req.headers['x-access-token'];
    const status = { status: false, user: false };
    return new Promise((resolve, reject) => {
      jwt.verify(token, utils.getTokenKey(), (err, decoded) => {
      if (err) {
        status.user = false;
        status.status = false;
      } else {
        status.status = true;
        status.user = decoded;
      }
      resolve(status);
    });
  });
  }
}