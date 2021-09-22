import React, { useEffect } from "react";
import PdfViewer from "../PdfViewerComponent/PdfViewer.component";
import "./FooterModal.styles.scss";

const Modal = ({ onClose, show, pdf }) => {
  if (!show) {
    return null;
  }

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <div className="new-modal" onClick={onClose}>
      <div className="new-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="new-modal-body">
          <div className="all-page-container">
            <PdfViewer pdf={pdf} />
          </div>
        </div>
        <div className="new-modal-footer">
          <button onClick={onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
