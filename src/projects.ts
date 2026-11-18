// Client review projects. Files live in the private R2 bucket under "<id>/".
// Passwords are NOT here: they come from the PROJECT_PASSWORDS env var ("p1:word-word-9,p2:...").
export type Project = {
  id: string;
  client: string; // shown as an on-screen watermark
  title: string;
  description: string;
  video: string;
  music: { title: string; file: string }[];
  thumbs: string[];
};

const make = (n: number): Project => ({
  id: `p${n}`,
  client: `Client ${n}`,
  title: `Project ${n}`,
  description: 'Replace with a short description of this project.',
  video: `p${n}/video.mp4`,
  music: [{ title: 'Track A', file: `p${n}/track-a.mp3` }],
  thumbs: [`p${n}/thumb-1.jpg`, `p${n}/thumb-2.jpg`],
});

export const projects: Project[] = Array.from({ length: 10 }, (_, i) => make(i + 1));
