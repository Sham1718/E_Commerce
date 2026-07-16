export const getErrorMessage = (error) => {
  if (!error) {
    return "Something went wrong. Please try again.";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  if (error?.error) {
    return error.error;
  }

  return "Something went wrong. Please try again.";
};

export const getApiErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  if (error?.code === "ERR_CANCELED" || error?.name === "CanceledError") {
    return "Request cancelled.";
  }

  if (!error?.response) {
    return "Network error. Please check your connection or make sure the API server is running.";
  }

  const data = error.response.data;

  if (typeof data === "string") {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.error) {
    return data.error;
  }

  return fallback;
};
