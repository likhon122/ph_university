import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const monoDBUrl = process.env.MONGODB_ATLAS_URL;
const frontendUrl = process.env.FRONTEND_URL || '';
const defaultPassword = process.env.DEFAULT_PASSWORD || '';
const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS;
const envMode = process.env.NODE_ENV || '';
const jwt_access_secret = process.env.JWT_ACCESS_SECRET || '';
const jwt_refresh_secret = process.env.JWT_REFRESH_SECRET || '';
const jwt_access_expires_in = process.env.JWT_ACCESS_EXPIRES_IN || '';
const jwt_refresh_expires_in = process.env.JWT_REFRESH_EXPIRES_IN || '';

export {
  PORT,
  monoDBUrl,
  frontendUrl,
  defaultPassword,
  bcryptSaltRounds,
  envMode,
  jwt_access_secret,
  jwt_refresh_secret,
  jwt_access_expires_in,
  jwt_refresh_expires_in,
};
