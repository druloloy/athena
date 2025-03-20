import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { CustomMiddleware } from './chain';

export function appendPathname(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const headers = new Headers(request.headers);
    headers.set('x-current-path', request.nextUrl.pathname);
    return middleware(request, event, NextResponse.next({ headers }));
  };
}
