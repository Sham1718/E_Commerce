import React from "react";

const Input = ({ label, error, className = "", textarea = false, children, ...props }) => {
  const fieldClass = `w-full rounded-lg border px-3 py-2.5 text-slate-800 
  outline-none transition placeholder:text-slate-400 focus:ring-2 ${
    error
      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
  } ${className}`;

  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>}
      {children || (textarea ? <textarea className={fieldClass} {...props} /> : <input className={fieldClass} {...props} />)}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </label>
  );
};

export default React.memo(Input);
