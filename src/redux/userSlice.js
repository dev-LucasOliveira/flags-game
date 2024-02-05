import { createSlice } from '@reduxjs/toolkit';
import { updateRecord } from '../services/firebaseConfig';

export const slice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    photoURL: '',
    name: '',
    email: '',
    record: 0,
    isLogged: false,
  },
  reducers: {
    setCurrentUser(state, payload) {
      return { ...state, ...payload.payload }
    },
    logout() {
      localStorage.removeItem('currentUser');
      return { isLogged: false, name: '', email: '', record: 0, id: '', photoURL: '' }
    },
    updateCurrentRecord(state, payload) {
      const { payload: { record, id } } = payload;
      updateRecord({ id, record });
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const data = {
        id: currentUser.id,
        photoURL: currentUser.photoURL,
        name: currentUser.name,
        email: currentUser.email,
        record,
        isLogged: true,
      }
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    },
  },
});

export const { setCurrentUser, updateCurrentRecord, logout } = slice.actions;

export default slice.reducer;
