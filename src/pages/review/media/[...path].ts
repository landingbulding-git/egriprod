import type { APIRoute } from 'astro';
import { COOKIE, allowedFiles, projectFromCookie, r2Fetch } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ params, request, cookies }) => {
  const project = projectFromCookie(cookies.get(COOKIE)?.value);
  const key = params.path ?? '';
  // Only the logged-in project's own files, exactly as listed in projects.ts.
  if (!project || !allowedFiles(project).includes(key)) return new Response('Not found', { status: 404 });

  const range = request.headers.get('range');
  const r = await r2Fetch(key, range ? { range } : {});
  if (!r.ok && r.status !== 206) return new Response('Not found', { status: 404 });

  const h = new Headers({ 'cache-control': 'private, no-store', 'content-disposition': 'inline', 'accept-ranges': 'bytes' });
  for (const k of ['content-type', 'content-length', 'content-range']) {
    const v = r.headers.get(k);
    if (v) h.set(k, v);
  }
  return new Response(r.body, { status: r.status, headers: h });
};
