import { ZodError } from 'zod';
import { TGenericErrorReturnType } from '../interface/error.interface';

const zodErrorHandler = (err: ZodError): TGenericErrorReturnType => {
  const zodErrors = err.errors.map(e => ({
    path: e.path?.join('.'),
    message: e.message,
  }));

  // Enhanced stack trace formatting for readability

  return {
    statusCode: 400,
    message: 'Validation error',
    errorSources: zodErrors,
  };
};

export default zodErrorHandler;
