export const handleResponse = (data) => {

    console.log("Response received: ", data)

    if(!data.message){
        return "No error message from server";
    }

    if(data.message.ClassName){
      return data.message.ClassName[0]
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
        
        if(data.message.includes("need fully-qualified address")){
            return "Please Enter a valid Email address"
        }

        if(data.message.length > 50){
          return data.message.substring(0, 50) + " . . ."
        } else {
          return data.message;
        }

      } else if (JSON.parse(data.message).email) {
        return JSON.parse(data.message).email[0];
    }

    return "An unknown error occurred";
};
    