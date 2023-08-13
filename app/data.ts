import data from '@/data.json';
import stripAccents from '@/_utils/stripAccents';

export type PaintingData = (typeof data)[number];

export const paintings = data.map((painting) => ({
  ...painting,
  id: stripAccents(painting.name.toLowerCase().replace(/\s+/g, '-')),
}));
