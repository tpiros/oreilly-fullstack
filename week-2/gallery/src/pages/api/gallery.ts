import { ResourceApiOptions, v2 as cloudinary } from 'cloudinary';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
cloudinary.config(true);
cloudinary.config({ secure: true });

export default async function handler(
  request: NextRequest,
  response: NextApiResponse
) {
  try {
    const url = cloudinary.url('coffee.json', {
      type: 'list',
      version: Date.now(),
    });
    const cldResponse = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    const { resources }: { resources: ResourceApiOptions } =
      await cldResponse.json();
    const public_ids = resources.map(
      (resource: ResourceApiOptions) => resource.public_id
    );
    return response.json({
      public_ids,
    });
  } catch (error) {
    return response.status(500).json({
      error:
        'Cannot generate image gallery. Make sure that images tagged as "coffee" are available in your Media Library.',
    });
  }
}
