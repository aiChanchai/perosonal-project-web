function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-error">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
