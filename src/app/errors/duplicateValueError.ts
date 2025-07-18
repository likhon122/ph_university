import { TGenericErrorReturnType } from '../interface/error.interface';

const duplicateValueError = (err: any): TGenericErrorReturnType => {
  const duplicateField = Object.keys(err.keyValue)[0];
  const duplicateValue = err.keyValue[duplicateField];

  return {
    statusCode: 400,
    message: `Duplicate value error: The ${duplicateField} ${duplicateValue} is already registered.`,
    errorSources: [
      {
        path: '',
        message: `The ${duplicateField} ${duplicateValue} is already registered.`,
      },
    ],
  };
};

export default duplicateValueError;
