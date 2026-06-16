export const getErrorMessage = (
  error: any
) => {

  if (
    error?.message ===
    "Network Error"
  ) {

    return `
Unable to connect
to server.

Please check
your internet connection.
`;
  }

  if (
    error?.response?.status === 401
  ) {

    return `
Session expired.

Please login again.
`;
  }

  if (
    error?.response?.status === 500
  ) {

    return `
Server error occurred.

Please try again later.
`;
  }

  return `
Something went wrong.

Please try again.
`;
};