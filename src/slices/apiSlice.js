import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include'
});

const apiSlice = createApi({
    baseQuery,
    tagTypes:['User', 'Note', 'Collection'],
    endpoints: (builder) => ({})
});

export default apiSlice;