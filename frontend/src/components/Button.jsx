import React from "react";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  dark: "bg-slate-900 text-white hover:bg-black focus:ring-slate-500",
  success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  isLoading = false,
  disabled = false,
  type = "button",
  ...props
}) => {
  const disabledClass = "disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 
        rounded-lg px-4 py-2.5 text-sm font-semibold transition 
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]} ${disabledClass} ${className}`}
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
};

export default React.memo(Button);
