import React from "react";
import { getErrorMessage } from "../utils/errorMessage";
import Button from "./Button";

const ErrorMessage = ({ error, title = "We could not load this section", onRetry }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-1 text-sm">{getErrorMessage(error)}</p>
        </div>
        {onRetry && (
          <Button variant="secondary" onClick={onRetry} className="border-red-200 text-red-700 hover:bg-red-100">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ErrorMessage);
