import { useEffect } from 'react';
import { Box, Button } from "@mui/material";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from "../../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/userSlice";

export function Login() {
  // eslint-disable-next-line
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lsUserData = localStorage.getItem('currentUser');

  const setCurrentUserData = (data, isFromLocalStorage) => {
    const userData = {
      name: data?.user?.displayName || data.name,
      email: data?.user?.email || data.email,
      id: data?.user?.uid || data.id,
      photoURL: data?.user?.photoURL || data.photoURL,
      isLogged: true,
    };
    !isFromLocalStorage && localStorage.setItem('currentUser', JSON.stringify(userData));
    const action = setCurrentUser(userData) 
    dispatch(action);
    navigate('/');
  }

  useEffect(() => {
    if (user) setCurrentUserData(user); // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (lsUserData) {
      setCurrentUserData(JSON.parse(lsUserData), true);
      navigate('/');
    } // eslint-disable-next-line
  }, [lsUserData])

  if (error) {
    return (
      <Box>
        <p>Error: {error.message}</p>
      </Box>
    );
  }

  // if (user) {
  //   setCurrentUserData(user);
  // }

  return (
    <Box className="App">
      <Button onClick={() => signInWithGoogle()}>Sign In With Google</Button>
    </Box>
  );
}