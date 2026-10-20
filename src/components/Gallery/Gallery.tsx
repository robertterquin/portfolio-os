import type { Evidence } from '../../content';
import './Gallery.css';

export function Gallery({ photos }: { photos: Evidence[] }) {
  if (photos.length === 0) return null;
  return (
    <div className="gallery">
      {photos.map((photo) => (
        <figure key={photo.url}>
          {/* Sized to the 4:3 crop the gallery CSS applies, so nothing shifts as images load. */}
          <img src={photo.url} alt={photo.alt ?? ''} loading="lazy" width={400} height={300} />
          <figcaption>{photo.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
