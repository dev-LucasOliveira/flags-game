import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    photoURL: '',
    name: '',
    email: '',
    record: null,
    isLogged: false,
  },
  reducers: {
    setCurrentUser(state, payload) {
      return {...state, ...payload.payload}
    },
    logout() {
      localStorage.removeItem('currentUser');
      return {isLogged: false, name: '', email: '', record: null, id: '', photoURL: ''}
    },
  },
});

export const { setCurrentUser, logout, remove } = slice.actions;

export default slice.reducer;
