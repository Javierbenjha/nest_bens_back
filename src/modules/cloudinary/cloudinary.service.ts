import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const publicId = `prod_${Date.now()}`;
      const upload = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          resource_type: 'auto',
          folder: 'productos',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary upload failed: no result returned'));
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }

  async uploadBase64(
    base64String: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const publicId = `prod_${Date.now()}`;
    return cloudinary.uploader.upload(base64String, {
      public_id: publicId,
      resource_type: 'auto',
      folder: 'productos',
    });
  }
}
