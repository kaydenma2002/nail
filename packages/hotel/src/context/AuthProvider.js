import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext();

const fakeUserData = {
  id: 1,
  name: 'Jhon Doe',
  avatar:
    'http://s3.amazonaws.com/redqteam.com/isomorphic-reloaded-image/profilepic.png',
  roles: ['USER', 'ADMIN'],
};
const storedLoggedIn = localStorage.getItem("loggedIn");
const storedToken = localStorage.getItem("token");
const AuthProvider = (props) => {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
    } catch(error) {
      console.error('Error parsing storedLoggedIn:', error);
      return false; // or handle the error in an appropriate way
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return storedToken ? JSON.parse(storedToken) : null;
    } catch(error) {
      console.error('Error parsing storedToken:', error);
      return null; // or handle the error in an appropriate way
    }
  });
  const [token, setToken] = useState()
  const signIn = (params) => {
    // localStorage.setItem(loggedIn,par)
    console.log(params, 'sign in form Props');
    localStorage.setItem("loggedIn", JSON.stringify(true))
    localStorage.setItem("token",JSON.stringify(params.data.token))
    setToken(params.data.access_token)
    setUser(params.data.user);
   
    setLoggedIn(JSON.stringify(true));
    navigate('/', { replace: true });
  };

  const signUp = (params) => {
    console.log(params, 'sign up form Props');
    setUser(fakeUserData);
    setLoggedIn(true);
    navigate('/', { replace: true });
  };

  const logOut = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.clear();

  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        signIn,
        signUp,
        user,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
