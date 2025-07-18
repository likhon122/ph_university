import { v2 as cloudinary } from 'cloudinary';
import httpStatus from 'http-status';
import fs from 'fs/promises';

import {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName,
} from '../configs';
import AppError from '../errors/AppError';

const uploadImage = async (
  file: Express.Multer.File,
  name: string,
): Promise<string> => {
  // Configuration
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  });

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(file?.path, {
        folder: 'ph_university/profile_images',
        public_id: `${name + '-' + Date.now()}`,
      })
      .catch(error => {
        throw new AppError(
          httpStatus.INTERNAL_SERVER_ERROR,
          `Image upload failed: ${error.message}`,
        );
      });

    await fs.unlink(file?.path);

    return uploadResult.secure_url;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export default uploadImage;
