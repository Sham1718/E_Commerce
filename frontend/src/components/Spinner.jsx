import React from "react";

const Spinner = ({ label = "Loading...", className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-3 text-slate-600 ${className}`}>
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default React.memo(Spinner);
