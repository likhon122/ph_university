import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TCodeAndNameMap,
  TMonth,
} from './academicSemester.interface';

const academicSemesterMonth: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
const academicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

const semesterCodeAndNameMap: TCodeAndNameMap = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export {
  academicSemesterMonth,
  academicSemesterName,
  academicSemesterCode,
  semesterCodeAndNameMap,
};
