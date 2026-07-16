import React from "react";
import Button from "./Button";

const ConfirmationModal = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isLoading = false,
  onCancel,
  onConfirm,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConfirmationModal);
