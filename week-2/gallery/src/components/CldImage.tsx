import { Cloudinary, Transformation } from '@cloudinary/url-gen';
import { thumbnail, scale } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { opacity } from '@cloudinary/url-gen/actions/adjust';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage, placeholder, responsive } from '@cloudinary/react';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
  },
});

const CldImage = ({
  publicId,
  gallery = false,
}: {
  publicId: string;
  gallery?: boolean;
}) => {
  if (gallery) {
    const myImage = cld
      .image(publicId)
      .resize(thumbnail().width(400).height(400))
      .overlay(
        source(
          image('imagecon/cloudinary-blue').transformation(
            new Transformation().resize(scale(50)).adjust(opacity(90))
          )
        ).position(
          new Position().gravity(compass('south_east')).offsetX(5).offsetY(5)
        )
      )
      .delivery(format('auto'))
      .delivery(quality('auto'));
    return (
      <AdvancedImage
        style={{ maxWidth: '100%' }}
        cldImg={myImage}
        plugins={[responsive(), placeholder({ mode: 'blur' })]}
        className="max-w-sm rounded-lg shadow-2xl"
      />
    );
  }

  const myImage = cld
    .image(publicId)
    .resize(
      thumbnail().width(250).height(250).zoom(0.75).gravity(focusOn(face()))
    )
    .delivery(format('auto'))
    .delivery(quality('auto'));
  return (
    <>
      <AdvancedImage
        cldImg={myImage}
        style={{ width: '250px', height: '250px' }}
        className="max-w-sm rounded-lg shadow-2xl"
      />
    </>
  );
};
export default CldImage;
