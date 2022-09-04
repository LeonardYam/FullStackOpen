import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import blogService from "../services/blogService";

const initialState = [];

const blogListSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
    update(state, action) {
      const { id } = action.payload;
      const indexToChange = state.findIndex((b) => b.id === id);
      state[indexToChange] = { ...state[indexToChange], ...action.payload };
    },
    setAll(state, action) {
      return action.payload;
    },
  },
});

export const { add, remove, update, setAll } = blogListSlice.actions;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setAll(blogs));
  };
};

export const updateBlog = (newBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(newBlog);
    dispatch(update(updatedBlog));
    dispatch(
      setNotification({
        type: "success",
        text: `${updatedBlog.title} successfully updated!`,
      })
    );
  };
};

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogToDelete);
    dispatch(remove(blogToDelete.id));
    dispatch(
      setNotification({
        type: "success",
        text: `${blogToDelete.title} successfully deleted!`,
      })
    );
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createBlog(newBlog);
    dispatch(add(createdBlog));
    dispatch(
      setNotification({
        type: "success",
        text: `${createdBlog.title} successfully created!`,
      })
    );
  };
};

export default blogListSlice.reducer;
