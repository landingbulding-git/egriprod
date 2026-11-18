// Usage (from the egriprod folder):
//   node --env-file=.env scripts/upload-project.mjs --list
//   node --env-file=.env scripts/upload-project.mjs "<projects/folder>" [--dry]
// Uploads one project's video, music and thumbnails to R2 with the write token, then writes pN/project.json last.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, basename, resolve } from 'node:path';
import { AwsClient } from 'aws4fetch';

const PROJECTS = resolve(import.meta.dirname, '../../projects');
const e = process.env;
const TYPES = { '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.m4v': 'video/mp4', '.webm': 'video/webm',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
const files = (dir, exts) => (existsSync(dir) ? readdirSync(dir) : []).filter((f) => exts.includes(extname(f).toLowerCase())).sort();

function details(folder) {
  const out = { id: '', client: '', title: '', description: '', password: '' };
  let cur;
  for (const line of readFileSync(join(folder, 'details.txt'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^(Project ID|Client|Title|Description|Password):\s*(.*)$/);
    if (m) { cur = { 'Project ID': 'id', Client: 'client', Title: 'title', Description: 'description', Password: 'password' }[m[1]]; out[cur] = m[2].trim(); }
    else if (cur === 'description') out.description += '\n' + line;
  }
  out.description = out.description.trim();
  return out;
}

const r2 = new AwsClient({ accessKeyId: e.R2_WRITE_ACCESS_KEY_ID, secretAccessKey: e.R2_WRITE_SECRET_ACCESS_KEY, service: 's3', region: 'auto' });
const base = `https://${e.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${e.R2_BUCKET}`;
const put = async (key, body, type) => {
  const r = await r2.fetch(`${base}/${key}`, { method: 'PUT', body, headers: { 'content-type': type, 'x-amz-content-sha256': 'UNSIGNED-PAYLOAD' } });
  if (!r.ok) throw new Error(`PUT ${key} failed: ${r.status} ${await r.text()}`);
};

function plan(folder) {
  const d = details(folder), problems = [];
  const video = files(join(folder, 'video'), ['.mp4', '.mov', '.m4v', '.webm']);
  const music = files(join(folder, 'music'), ['.mp3', '.wav', '.m4a']);
  const thumbs = files(join(folder, 'thumbnail'), ['.jpg', '.jpeg', '.png', '.webp']);
  if (!/^p\d+$/.test(d.id)) problems.push('details.txt has no valid "Project ID: pN"');
  if (!d.client) problems.push('Client is empty');
  if (!d.title) problems.push('Title is empty');
  if (video.length !== 1) problems.push(`expected exactly 1 video, found ${video.length}`);
  if (music.length !== 1) problems.push(`expected exactly 1 music file, found ${music.length}`);
  if (thumbs.length < 1) problems.push('no thumbnails found');
  const pw = (e.PROJECT_PASSWORDS ?? '').split(',').find((x) => x.startsWith(d.id + ':'))?.split(/:(.*)/s)[1];
  if (pw !== d.password) problems.push(`password in details.txt differs from PROJECT_PASSWORDS in .env (${d.id})`);
  const items = [
    [`${d.id}/video${extname(video[0] ?? '').toLowerCase()}`, join(folder, 'video', video[0] ?? '')],
    [`${d.id}/music${extname(music[0] ?? '').toLowerCase()}`, join(folder, 'music', music[0] ?? '')],
    ...thumbs.map((t, i) => [`${d.id}/thumb-${i + 1}${extname(t).toLowerCase()}`, join(folder, 'thumbnail', t)]),
  ];
  const json = { id: d.id, client: d.client, title: d.title, description: d.description, video: items[0][0],
    music: [{ title: basename(music[0] ?? '', extname(music[0] ?? '')), file: items[1][0] }], thumbs: items.slice(2).map((i) => i[0]) };
  return { d, problems, items, json };
}

async function list() {
  for (const f of readdirSync(PROJECTS).filter((f) => statSync(join(PROJECTS, f)).isDirectory()).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
    if (!existsSync(join(PROJECTS, f, 'details.txt'))) { console.log(`${f}\t(no details.txt)`); continue; }
    const { d, problems } = plan(join(PROJECTS, f));
    const live = (await r2.fetch(`${base}/${d.id}/project.json`, { method: 'HEAD' })).ok;
    console.log(`${f}\t${d.id}\tclient: ${d.client || '-'}\tpublished: ${live ? 'yes' : 'no'}\t${problems.length ? 'TODO: ' + problems.join('; ') : 'ready to upload'}`);
  }
}

async function upload(folder, dry) {
  const { d, problems, items, json } = plan(folder);
  if (problems.length) { console.error('Cannot upload:\n- ' + problems.join('\n- ')); process.exit(1); }
  console.log(`${dry ? 'DRY RUN: ' : ''}${d.id} (${d.client})`);
  for (const [key, path] of items) console.log(`  ${key}  <-  ${basename(path)} (${(statSync(path).size / 1e6).toFixed(1)} MB)`);
  if (dry) return;
  for (const [key, path] of items) { await put(key, readFileSync(path), TYPES[extname(key)]); console.log('  uploaded', key); }
  // Remove leftovers from an earlier upload of this project, then publish project.json last.
  const keep = new Set([...items.map((i) => i[0]), `${d.id}/project.json`]);
  const l = await (await r2.fetch(`${base}?list-type=2&prefix=${d.id}/`)).text();
  for (const k of [...l.matchAll(/<Key>([^<]+)<\/Key>/g)].map((m) => m[1]).filter((k) => !keep.has(k))) {
    await r2.fetch(`${base}/${k}`, { method: 'DELETE' }); console.log('  removed old', k);
  }
  await put(`${d.id}/project.json`, JSON.stringify(json, null, 2), 'application/json');
  console.log(`Published ${d.id}. Client logs in at /review with password: ${d.password}`);
}

const [arg, flag] = process.argv.slice(2);
if (!arg) { console.error('Usage: --list | <projects folder> [--dry]'); process.exit(1); }
await (arg === '--list' ? list() : upload(resolve(PROJECTS, arg), flag === '--dry'));
