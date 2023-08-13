import styles from './page.module.css';
import type { Metadata } from 'next';
import { paintings } from '@/data';
import Header from '@/_components/Header';
import Lightbox from '@/_components/Lightbox';
import MediaControl from '@/_components/MediaControl';
import normalizeUrl from '@/_utils/normalizeUrl';

export async function generateStaticParams() {
  return paintings.map(({ id }) => ({ id }));
}

type Props = {
  params: {
    id: string;
  };
};

export function generateMetadata({ params: { id } }: Props): Metadata {
  const { name, description } = paintings.find(
    (painting) => painting.id === id,
  )!;
  return {
    title: `Galleria - ${name}`,
    description: description.slice(0, description.indexOf('.') + 1),
  };
}

export default function Page({ params: { id } }: Props) {
  const paintingIndex = paintings.findIndex((painting) => painting.id === id);
  const lastPaintingIndex = paintings.length - 1;

  const painting = paintings[paintingIndex];
  const previousPainting = paintings[paintingIndex - 1];
  const nextPainting = paintings[paintingIndex + 1];

  const paintingName = painting.name;
  const paintingDescription = painting.description;
  const paintingYear = painting.year;
  const paintingImages = painting.images;

  const artistName = painting.artist.name;
  const artistImage = painting.artist.image;

  const source = painting.source;

  return (
    <>
      <Header action="stop" />
      <main className={styles.content}>
        <section className={styles.painting}>
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={normalizeUrl(paintingImages.hero.large)}
            />
            <img
              className={styles.hero}
              src={normalizeUrl(paintingImages.hero.small)}
              alt={`${paintingName} painting.`}
            />
          </picture>
          <Lightbox
            className={styles.viewButton}
            name={paintingName}
            url={normalizeUrl(paintingImages.gallery)}
          />
          <div className={styles.legend}>
            <h1 className={styles.legendPainting}>{paintingName}</h1>
            <p className={styles.legendArtist}>{artistName}</p>
            <img
              className={styles.legendImage}
              src={normalizeUrl(artistImage)}
              alt={artistName}
            />
          </div>
        </section>
        <div className={styles.info}>
          <div className={styles.year}>{paintingYear}</div>
          <div className={styles.context}>
            <p className={styles.description}>{paintingDescription}</p>
            <a className={styles.source} href={source}>
              Go to source
            </a>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.controls}>
          <div
            className={styles.progress}
            style={{
              ['--progress' as string]: `${
                (paintingIndex + 1) / (lastPaintingIndex + 1)
              }`,
            }}
          ></div>
          <div>
            <h2 className={styles.controlPainting}>{paintingName}</h2>
            <p className={styles.controlArtist}>{artistName}</p>
          </div>
          <MediaControl
            action="previous"
            href={previousPainting ? `/${previousPainting.id}` : undefined}
          />
          <MediaControl
            action="next"
            href={nextPainting ? `/${nextPainting.id}` : undefined}
          />
        </div>
      </footer>
    </>
  );
}
