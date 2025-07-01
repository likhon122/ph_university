import { TTimeConflictWithFaculty } from './offeredCourse.type';

const hasTimeConflict = (
  timeConflictWithFaculty: TTimeConflictWithFaculty[],
  startTime: string,
  endTime: string,
): boolean => {
  const newStartTime = new Date(`2020-02-20T${startTime}:00`);
  const newEndTime = new Date(`2020-02-20T${endTime}:00`);

  for (const offeredCourseExist of timeConflictWithFaculty) {
    const existingStartTime = new Date(
      `2020-02-20T${offeredCourseExist.startTime}:00`,
    );
    const existingEndTime = new Date(
      `2020-02-20T${offeredCourseExist.endTime}:00`,
    );

    // Check if the new time conflicts with the existing offered course time
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};

export { hasTimeConflict };
