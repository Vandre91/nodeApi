'use strict';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default {
  auth: (req: Request, res: Response, secretKey: string, next) => {
    const token = req.body.token || req.params.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (err: object, decoded: object) => {
        if (err) {
          res.status(401).json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          next(req, res, decoded);
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'No token provided.'
      });
    }
  }
};