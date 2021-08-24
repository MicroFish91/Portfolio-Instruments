export const formatLogError = (error: Error, route: string) => {
  const errorMessage = {
    message: error.message,
    route,
    stack: error.stack,
  };

  return {
    message: JSON.stringify(errorMessage),
  };
};

export const formatValidationError = (
  message: string,
  route: string,
  userId?: number
) => {
  const errorMessage = {
    type: "validation",
    userId,
    message,
    route,
  };

  return { message: JSON.stringify(errorMessage) };
};
