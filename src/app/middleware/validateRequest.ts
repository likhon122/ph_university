import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate All request body in body object using zod
      await schema.parseAsync({
        body: req.body,
        params: req.params,
      });

      // If all is ok then send request in controller
      next();
    } catch (error) {
      // If occur any error then send global error handler. Global error handler handle this error!
      next(error);
    }
  };
};

export default validateRequest;
