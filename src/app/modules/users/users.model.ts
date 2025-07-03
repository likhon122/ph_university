import { TCreateUser, UserModelType } from './users.interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { bcryptSaltRounds } from '../../configs';

const userSchema = new Schema<TCreateUser, UserModelType>(
  {
    id: {
      type: String,
      required: [true, 'Id is required to create a user.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required to create a user.'],
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
      default: null,
    },
    passwordChangeIp: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      required: [true, 'Role is required to create a user.'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // Hash the password and save it
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(bcryptSaltRounds),
  );
  user.password = hashedPassword;
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  const user = await User.findOne({ id }).select('+password');
  if (user) {
    return user;
  }
  return null;
};

userSchema.statics.hashPassword = async function (password: string) {
  if (!password) {
    throw new Error('Password is required to hash.');
  }
  const hashedPassword = await bcrypt.hash(password, Number(bcryptSaltRounds));
  return hashedPassword;
};

userSchema.statics.isJwtIssuedBeforePasswordChange = function (
  passwordChangedAt: Date,
  jwtIssuedAt: number,
) {
  const passwordChangeTime = new Date(passwordChangedAt).getTime() / 1000; // Convert to seconds

  return passwordChangeTime > jwtIssuedAt;
};
const User = model<TCreateUser, UserModelType>('user', userSchema);

export default User;
