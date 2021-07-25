// store user and token in session stotage

export const authenticate = (response, next) => {
   if (window !== "undefined") {
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      sessionStorage.setItem("user", JSON.stringify(response.data.name));
   }

   next();
};

//get users info from session storage

export const getUser = () => {
   if (window !== "undefined") {
      if (sessionStorage.getItem("user")) {
         return JSON.parse(sessionStorage.getItem("user"));
      }
   }
};

//get token from session storage
export const getToken = () => {
   if (window !== "undefined") {
      if (sessionStorage.getItem("token")) {
         return JSON.parse(sessionStorage.getItem("token"));
      }
   }
};

//remove user and token from session storage

export const logout = (next) => {
   if (window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
   }

   next();
};
