import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include'
});

const apiSlice = createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints: (builder) => ({})
});

export default apiSlice;