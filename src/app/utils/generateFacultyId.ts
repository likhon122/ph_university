import Faculty from '../modules/faculty/faculty.model';

const generateFacultyId = async () => {
  const defaultFacultyId = 'F-0001';

  let facultyId: string = defaultFacultyId;
  const lastFacultyId = await Faculty.findOne()
    .sort({ createdAt: -1 })
    .limit(1)
    .select('id');

  if (lastFacultyId && lastFacultyId.id) {
    const lastFacultyIdNumber = lastFacultyId.id.split('-')[1];
    const newFacultyIdNumber = parseInt(lastFacultyIdNumber) + 1;
    facultyId = `F-${newFacultyIdNumber.toString().padStart(4, '0')}`;
  }

  return facultyId;
};

export default generateFacultyId;
