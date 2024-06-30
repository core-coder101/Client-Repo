export const handleError = (error) => {

  console.log("Error received: ", error)
  
    if (!error.response) {
      return error.message || "Network error";
    }

    const { data } = error.response;

    if (data.message) {
      if (data.message.email) {
        return data.message.email;
      }
      
      if (typeof data.message === 'string') {
        if (data.message.includes("[2002]")) {
          console.error("DATABASE DOWN");
          return "Database down at the moment";
        }

        if (data.message.includes("users_email_unique")) {
          return "Email must be unique";
        }
  
        return data.message;
      }
    }
    return "An unknown error occurred";
  };
  