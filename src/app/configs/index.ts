import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const monoDBUrl = process.env.MONGODB_ATLAS_URL;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5001';
const defaultPassword = process.env.DEFAULT_PASSWORD || '1234';
const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS;
const envMode = process.env.NODE_ENV || 'development';

export {
  PORT,
  monoDBUrl,
  frontendUrl,
  defaultPassword,
  bcryptSaltRounds,
  envMode,
};
