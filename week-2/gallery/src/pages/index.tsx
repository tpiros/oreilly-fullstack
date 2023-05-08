import { ChangeEvent, FormEvent, useState } from 'react';
import CldImage from '../components/CldImage';
import Placeholder from '../components/Placeholder';

export default function UploadWidgetDemo() {
  const [image, setImage] = useState<File>();
  const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [publicId, setPublicId] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const uploadToClient = (event: FormEvent<HTMLFormElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
      setIsImageLoading(true);
      const img = files[0];
      setImage(img);
      setSelectedImage(img);
      setUploadButtonEnabled(true);
    }
  };
  const uploadToServer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = new FormData();
    if (image && image instanceof File) {
      body.append('file', image);
      try {
        const response = await (
          await fetch('/api/upload', {
            method: 'POST',
            body,
          })
        ).json();
        setPublicId(response.public_id);
        setIsImageLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          {publicId ? (
            <CldImage publicId={publicId} />
          ) : (
            <Placeholder loading={isImageLoading} src={selectedImage} />
          )}
          <div>
            <h1 className="text-5xl font-bold">Cloudinary API Upload</h1>
            <p className="py-6">
              Click the button below to upload an image to your Cloudinary
              account. It will appear on the left, optimised after upload.
            </p>
            <form
              method="post"
              onChange={(event) => uploadToClient(event)}
              onSubmit={(event) => uploadToServer(event)}
            >
              <p>
                <input
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-focus"
                  type="file"
                  name="file"
                />
                <button
                  disabled={!isImageLoading}
                  className="btn btn-primary btn-sm"
                >
                  Upload File
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
