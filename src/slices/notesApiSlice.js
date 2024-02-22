import apiSlice from './apiSlice';
const NOTES_URL = '/api/notes';

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addNote: builder.mutation({
            query: (data) => ({
                url: `${NOTES_URL}/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Note']
        }),
        updateNote: builder.mutation({
            query: ({id, ...data}) => ({
                url: `${NOTES_URL}/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Note']
        }),
        getNote: builder.query({
            query: (noteID) => `${NOTES_URL}/${noteID}`,
            providesTags: (result, error, arg) => [{type:'Note', id: arg}],
        }),
        getAllNotes: builder.query({
            query: () => `${NOTES_URL}/`,
            providesTags: (result, error, arg) => [
                'Note',
                ...result.map(({_id}) => ({type:'Note', _id}))
            ]
        })
    })
});

export const { 
    useAddNoteMutation,
    useUpdateNoteMutation,
    useGetNoteQuery, 
    useGetAllNotesQuery 
} = notesApiSlice;
