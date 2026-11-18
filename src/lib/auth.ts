import { createHmac, timingSafeEqual } from 'node:crypto';
import { AwsClient } from 'aws4fetch';
import { projectIds, type Project } from '../projects';

const env = (k: string) => (import.meta.env[k] ?? process.env[k]) as string | undefined;
export const COOKIE = 'review_session'; // one-shot: consumed by the first page load after login
export const MEDIA_COOKIE = 'review_media'; // lets that page fetch its own files; useless without the page

const sign = (id: string) => createHmac('sha256', env('SESSION_SECRET')!).update(id).digest('hex');
const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export const sessionValue = (id: string) => `${id}.${sign(id)}`;

export function idFromCookie(value?: string): string | undefined {
  const [id, mac] = (value ?? '').split('.');
  if (id && mac && same(mac, sign(id)) && projectIds.includes(id)) return id;
}

export async function loadProject(id: string): Promise<Project | undefined> {
  const r = await r2Fetch(`${id}/project.json`, {});
  return r.ok ? ((await r.json()) as Project) : undefined;
}

export function idFromPassword(pw: string): string | undefined {
  const entries = (env('PROJECT_PASSWORDS') ?? '').split(',').map((e) => e.trim().split(/:(.*)/s));
  const hit = entries.find(([, p]) => p && same(p, pw.trim()));
  return hit && projectIds.includes(hit[0]) ? hit[0] : undefined;
}

let r2: AwsClient;
export function r2Fetch(key: string, headers: HeadersInit) {
  r2 ??= new AwsClient({
    accessKeyId: env('R2_ACCESS_KEY_ID')!,
    secretAccessKey: env('R2_SECRET_ACCESS_KEY')!,
    service: 's3',
    region: 'auto',
  });
  return r2.fetch(`https://${env('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com/${env('R2_BUCKET')}/${key}`, { headers });
}
