import { createSlice } from '@reduxjs/toolkit';

/*
createSlice takes an object with three main options fields:

name: a string that will be used as the prefix for generated action types
initialState: the initial state of the reducer
reducers: an object where the keys are strings, and the values are "case reducer" functions that will handle specific actions
*/

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  pins: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer; //export to store
