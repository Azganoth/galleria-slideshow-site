import 'server-only';

const basePath = process.env.BASE_PATH;

export default function normalizeUrl(url: string) {
  let u = url.startsWith('./') ? url.slice(1) : url;
  return basePath ? `${basePath}${u}` : u;
}
