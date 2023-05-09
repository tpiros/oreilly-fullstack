import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const handler = (request: NextRequest) => {
  return NextResponse.json({
    name: `Hello, from ${request.url} I'm now an Edge Function!`,
  });
};

export default handler;
