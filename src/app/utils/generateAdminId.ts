import { Admin } from '../modules/admin/admin.model';

const generateAdminId = async () => {
  const defaultAdminId = 'A-0001';

  let adminId: string = defaultAdminId;

  const lastFullAdminId = await Admin.findOne()
    .sort({ createdAt: -1 })
    .limit(1)
    .select('id');

  if (lastFullAdminId && lastFullAdminId.id) {
    const lastAdminId = lastFullAdminId.id.split('-')[1];
    const increasedAdminId = parseInt(lastAdminId) + 1;

    adminId = `A-${increasedAdminId.toString().padStart(4, '0')}`;
  }

  return adminId;
};

export default generateAdminId;
