const User_Roles = {
  admin: 'admin',
  student: 'student',
  faculty: 'faculty',
} as const;

const userStatus = ['in-progress', 'blocked'];

export { User_Roles, userStatus };
