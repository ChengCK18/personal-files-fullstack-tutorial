import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
    }
});

export const initializeBlogs = (user) => {
    return async (dispatch) => {
        const blogs = await blogService.getAll({ user });
        dispatch(setBlogs(blogs));
    };
};



export const { setBlogs } = blogSlice.actions;

export default blogSlice.reducer;
