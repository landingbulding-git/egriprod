import type { APIRoute } from 'astro';
import { MEDIA_COOKIE, idFromCookie, r2Fetch } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ params, request, cookies }) => {
  const id = idFromCookie(cookies.get(MEDIA_COOKIE)?.value);
  const key = params.path ?? '';
  // Only files inside the logged-in project's own folder (never project.json).
  if (!id || !key.startsWith(`${id}/`) || key.includes('..') || key.endsWith('project.json')) return new Response('Not found', { status: 404 });

  // Only the page's own <video>/<audio>/<img> tags; pasting the link in a tab, "Save as" or a plain downloader is refused.
  // shortcut: a scripted client can fake this header, and browsers older than ~2023 don't send it; upgrade to short-lived tokens if that matters.
  if (!['video', 'audio', 'image'].includes(request.headers.get('sec-fetch-dest') ?? '')) return new Response('Not found', { status: 404 });

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
