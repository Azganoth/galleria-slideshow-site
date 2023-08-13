'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Lightbox.module.css';
import ViewIcon from '@/_assets/icon-view-image.svg';

export default function Lightbox({
  className,
  name,
  url,
}: {
  className: string;
  name: string;
  url: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.classList.add('no-scroll');
      return () => {
        document.body.classList.remove('no-scroll');
      };
    }
  }, [show]);

  // wait for client-side/mount
  // https://github.com/vercel/next.js/blob/canary/examples/with-portals/components/ClientOnlyPortal.js
  const [lightboxContainer, setLightboxContainer] = useState<Element>();
  useEffect(() => {
    setLightboxContainer(document.body);
  }, []);

  return (
    <>
      <button
        className={`${styles.trigger} ${className}`}
        type="button"
        onClick={() => setShow(true)}
      >
        <ViewIcon />
        <span>View image</span>
      </button>
      {lightboxContainer &&
        createPortal(
          <div className={`${styles.lightbox} ${show ? styles.show : ''}`}>
            <div className={styles.painting}>
              <button
                className={styles.close}
                type="button"
                onClick={() => setShow(false)}
              >
                Close
              </button>
              <img className={styles.image} src={url} alt={name} />
            </div>
          </div>,
          lightboxContainer,
        )}
    </>
  );
}
