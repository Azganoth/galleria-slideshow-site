import styles from './page.module.css';
import Link from 'next/link';
import { paintings } from '@/data';
import Header from '@/_components/Header';
import Masonry from '@/_components/Masonry';
import normalizeUrl from '@/_utils/normalizeUrl';

export default function Page() {
  return (
    <>
      <Header action="start" />
      <main className={styles.content}>
        <Masonry>
          {paintings.map((painting) => (
            <Link
              key={painting.id}
              className={styles.card}
              href={`/${painting.id}`}
            >
              <img
                className={styles.cardImage}
                src={normalizeUrl(painting.images.thumbnail)}
                alt=""
              />
              <div className={styles.cardInfo}>
                <h2 className={styles.cardPaintingName}>{painting.name}</h2>
                <p className={styles.cardArtistName}>{painting.artist.name}</p>
              </div>
            </Link>
          ))}
        </Masonry>
      </main>
    </>
  );
}
