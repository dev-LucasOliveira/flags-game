import { useEffect } from 'react';
import { Box, Button } from "@mui/material";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, getUser, setNewUser } from "../../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/userSlice";

export function Login() {
  // eslint-disable-next-line
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lsUserData = localStorage.getItem('currentUser');

  const setCurrentUserData = async (data, isFromLocalStorage) => {
    let userData;
    if (!isFromLocalStorage) {
      const id = data?.user?.uid
      const user = await getUser({ id });
      if (!user._document) {
        const {
          user: {
            email,
            uid,
            photoURL,
            displayName,
          },
        } = data;
        userData = {
          name: displayName,
          email: email,
          id: uid,
          record: 0,
          photoURL: photoURL,
        };
        setNewUser(userData);
        userData.isLogged = true;
      } else {
        const {
          _document: {
            data: {
              value: {
                mapValue: {
                  fields: {
                    email,
                    name,
                    record,
                  },
                },
              },
            },
          },
        } = user;
        userData = {
          name: name.stringValue,
          email: email.stringValue,
          id,
          record: record.integerValue,
          photoURL: data?.user?.photoURL,
          isLogged: true,
        };
      }
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } else {
      userData = {
        name: data.name,
        email: data.email,
        id: data.id,
        photoURL: data.photoURL,
        isLogged: true,
        record: data.record,
      };
    }
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