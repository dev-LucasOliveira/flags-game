import { configureStore } from "@reduxjs/toolkit";
import userReducers from './userSlice';

export default configureStore({
  reducer: {
    user: userReducers,
  }
})