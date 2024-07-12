export const handleError = (error) => {
  console.log("Error received: ", error);

  if (!error.response) {
    return error.message || "Network error";
  }

  const { data, status } = error.response;

  if (data.message) {
    try {
      // If data.message is a JSON string, parse it
      const parsedMessage = JSON.parse(data.message);

      if (parsedMessage.email) {
        return parsedMessage.email[0];
      }
    } catch (e) {
      // If parsing fails, continue to handle message as a string
      console.error("Failed to parse message as JSON:", e);
    }

    if (typeof data.message === 'string') {
      if (data.message.includes("[2002]")) {
        console.error("DATABASE DOWN");
        return "Database down at the moment";
      }

      if (data.message.includes("users_email_unique")) {
        return "Email must be unique";
      }

      if (data.message.includes("Undefined variable $teacher")) {
        return "Teacher not found";
      }

      return data.message;
    }

    // If data.message is an object, extract the error message
    if (typeof data.message === 'object') {
      const errorMessages = Object.values(data.message).flat();
      if (errorMessages.length > 0) {
        return errorMessages[0];
      }
    }
  }

  // Log the full error response for debugging purposes
  console.error("Unhandled error response:", { status, data });

  return "An unknown error occurred";
};
