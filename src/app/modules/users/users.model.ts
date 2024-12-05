import { TCreateUser } from './users.interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { bcryptSaltRounds } from '../../configs';

const userSchema = new Schema<TCreateUser>({
  id: {
    type: String,
    required: [true, 'Id is required to create a user.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required to create a user.'],
  },
  needsPasswordChange: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
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
},{ timestamps: true });

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

const User = model<TCreateUser>('user', userSchema);

export default User;
