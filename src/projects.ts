// Project IDs only. Each project's content lives in R2 as "<id>/project.json", written by the upload skill.
export type Project = {
  id: string;
  client: string; // on-screen watermark text
  title: string;
  description: string;
  video: string;
  music: { title: string; file: string }[];
  thumbs: string[];
};

export const projectIds = Array.from({ length: 10 }, (_, i) => `p${i + 1}`);
