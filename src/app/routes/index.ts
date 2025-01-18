import { Router } from 'express';
import studentRoute from '../modules/student/student.routes';
import userRouter from '../modules/users/users.routes';
import academicSemesterRoutes from '../modules/academicSemester/academicSemester.routes';
import academicFacultyRoutes from '../modules/academicFaculty/academicFaculty.routes';
import academicDepartmentRoutes from '../modules/academicDepartment/academicDepartment.routes';
import facultyRoutes from '../modules/faculty/faculty.routes';
import adminRoutes from '../modules/admin/admin.routes';

const router = Router();

const routeModule = [
  {
    path: '/students',
    router: studentRoute,
  },
  {
    path: '/users',
    router: userRouter,
  },
  {
    path: '/academic-semesters',
    router: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    router: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    router: academicDepartmentRoutes,
  },
  {
    path: '/faculties',
    router: facultyRoutes,
  },
  {
    path: '/admin',
    router: adminRoutes,
  },
];

routeModule.forEach(route => router.use(route.path, route.router));

export default router;
