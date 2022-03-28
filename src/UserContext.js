import React from 'react';

//Create a Context object
//A context object is a type of object that can be used to store information that can be shared to all other components with the app
const UserContext = React.createContext();

//define the Provider component, which distributes states across all our components
export const UserProvider = UserContext.Provider;

export default UserContext;