export const handleError = (error) => {

  console.log("Error received: ", error)
  
    if (!error.response) {
      if(typeof error.message === 'string'){
        return error.message || "Network error";
      } else {
        return "Cannot display error message"
      }
    }

    const { data } = error.response;

    if (data.message) {
      if (JSON.parse(data.message).email) {
        return JSON.parse(data.message).email[0];
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
          return "Teacher not Found";
        }
  
        return data.message;
      }
    }
    return "An unknown error occurred";
  };
  