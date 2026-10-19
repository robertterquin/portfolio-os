import { useEffect, useRef } from 'react';
import { Window } from '../os';
import { CertificateViewer } from './CertificateViewer';
import type { ViewerItem } from './parts';
import './ViewerDialog.css';

type ViewerDialogProps = {
  item: ViewerItem;
  onClose: () => void;
};

/** The Certificate Viewer as a modal, for List view and phones where there are no windows. */
export function ViewerDialog({ item, onClose }: ViewerDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      className="viewer-dialog"
      aria-label="Certificate Viewer"
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop closes the dialog.
        if (event.target === event.currentTarget) ref.current?.close();
      }}
    >
      <Window title="Certificate Viewer" accent="mint" onClose={() => ref.current?.close()}>
        <CertificateViewer item={item} />
      </Window>
    </dialog>
  );
}
