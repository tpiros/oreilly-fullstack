import { v2 as cloudinary } from 'cloudinary';
import formidable, { File } from 'formidable';
import { unlinkSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};
cloudinary.config(true);

const promisifyFormParser = (request: NextApiRequest) => {
  const form = formidable();
  return new Promise<File[]>((resolve, reject) => {
    const files: File[] = [];
    form.on('file', (field, file) => {
      files.push(file);
    });
    form.on('end', () => resolve(files));
    form.on('error', (error) => reject(error));
    form.parse(request, () => {});
  });
};

const postHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const [file] = await promisifyFormParser(request);
  const cldResponse = await uploadToCloudinary(file.filepath);
  return response.status(201).send(cldResponse);
};

const uploadToCloudinary = async (file: string) => {
  try {
    const results = await cloudinary.uploader.upload(file, {
      // upload_preset: 'imagecon-uw',
      upload_preset: 'tag-as-coffee',
    });
    await unlinkSync(file);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    return postHandler(request, response);
  }
}
