import { createHmac, timingSafeEqual } from 'node:crypto';
import { AwsClient } from 'aws4fetch';
import { projects, type Project } from '../projects';

const env = (k: string) => (import.meta.env[k] ?? process.env[k]) as string | undefined;
export const COOKIE = 'review_session';

const sign = (id: string) => createHmac('sha256', env('SESSION_SECRET')!).update(id).digest('hex');
const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export const sessionValue = (id: string) => `${id}.${sign(id)}`;

export function projectFromCookie(value?: string): Project | undefined {
  const [id, mac] = (value ?? '').split('.');
  if (!id || !mac || !same(mac, sign(id))) return;
  return projects.find((p) => p.id === id);
}

export function projectFromPassword(pw: string): Project | undefined {
  const entries = (env('PROJECT_PASSWORDS') ?? '').split(',').map((e) => e.trim().split(/:(.*)/s));
  const hit = entries.find(([, p]) => p && same(p, pw.trim()));
  return projects.find((p) => p.id === hit?.[0]);
}

export const allowedFiles = (p: Project) => [p.video, ...p.music.map((m) => m.file), ...p.thumbs];

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
