import React from "react";
import Button from "./Button";

const EmptyState = ({ icon = "□", title, message, actionLabel, onAction }) => {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
        {icon}
      </div>
      <h2 className="mt-5 text-2xl font-bold text-slate-800">{title}</h2>
      {message && <p className="mx-auto mt-2 max-w-md text-slate-500">{message}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default React.memo(EmptyState);
