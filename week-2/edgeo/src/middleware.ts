// import type { NextRequest } from 'next/server';

// import { NextResponse } from 'next/server';
// const BLOCKED_COUNTRY = 'AU';
// export const config = {
//   matcher: '/',
// };

// export function middleware(req: NextRequest) {
//   const country = req.geo.country || 'US';
//   if (country === BLOCKED_COUNTRY) {
//     req.nextUrl.pathname = '/blocked';
//   } else {
//     req.nextUrl.pathname = `/${country}`;
//   }
//   return NextResponse.rewrite(req.nextUrl);
// }

import { NextRequest, NextResponse } from 'next/server';
import countries from './lib/countries.json';

// run only on homepage
export const config = {
  matcher: '/',
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const country = geo.country || 'SG';
  const city = geo.city || 'Singapore';
  const region = geo.region || 'Singapore';

  const countryInfo = countries.find((x) => x.cca2 === country);

  const currencyCode = Object.keys(countryInfo.currencies)[0];
  const currency = countryInfo.currencies[currencyCode];
  const languages = Object.values(countryInfo.languages).join(', ');

  url.searchParams.set('country', country);
  url.searchParams.set('city', city);
  url.searchParams.set('region', region);
  url.searchParams.set('currencyCode', currencyCode);
  url.searchParams.set('currencySymbol', currency.symbol);
  url.searchParams.set('name', currency.name);
  url.searchParams.set('languages', languages);

  return NextResponse.rewrite(url);
}
