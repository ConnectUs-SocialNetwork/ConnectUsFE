import ReactDOM from "react-dom";
import classes from "../../styles/UI/ConfirmModal.module.css";
import React from "react";
import Card from "./Card";

interface BackdropProps {
  onConfirm: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

interface ModalOverlayProps {
  entityId: number;
  message: string;
  onConfirm: (data: any) => void;
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <Card className={classes.modal}>
      <div className={classes.header}>
        <p>{props.message}</p>
      </div>
      <div className={classes.actions}>
        <button
          onClick={() => {
            props.onConfirm(props.entityId);
            props.onClose();
          }}
          className={classes.acceptButton}
        >
          Accept
        </button>
        <button onClick={props.onClose} className={classes.cancelButton}>
          Cancel
        </button>
      </div>
    </Card>
  );
};

interface ConfirmModalProps {
  entityId: number;
  message: string;
  onConfirm: (data: any) => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          entityId={props.entityId}
          message={props.message}
          onConfirm={props.onConfirm}
          onClose={props.onClose}
        />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default ConfirmModal;
