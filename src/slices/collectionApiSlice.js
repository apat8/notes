import apiSlice from "./apiSlice";
const COLLECTION_URL = '/api/collections';

export const collectionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCollection: builder.mutation({
            query: (data) => ({
                url: `${COLLECTION_URL}/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Collection']
        }),
        updateCollection: builder.mutation({
            query: ({id, ...data}) => ({
                url: `${COLLECTION_URL}/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Collection']
        }),
        getCollection: builder.query({
            query: (collectionID) => `${COLLECTION_URL}/${collectionID}`,
            providesTags: (result, error, arg) => [{type:'Collection', id: arg}],
        }),

        getAllCollections: builder.query({
            query: () => `${COLLECTION_URL}/`,
            providesTags: (result, error, arg) => [
                'Note',
                ...result.map(({_id}) => ({type:'Collection', _id}))
            ]
        })        
    })
})

export const {
    useAddCollectionMutation,
    useUpdateCollectionMutation,
    useGetCollectionQuery,
    useGetAllCollectionsQuery
} = collectionApiSlice;
