import { configureStore } from '@reduxjs/toolkit';
import { usersApiSlice } from './slices/usersApiSlice';
import { notesApiSlice } from './slices/notesApiSlice';
import apiSlice from './slices/apiSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [usersApiSlice.reducerPath] : usersApiSlice.reducer,
        [notesApiSlice.reducerPath] : notesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;