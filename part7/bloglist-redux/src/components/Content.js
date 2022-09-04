import Blogs from "./Blogs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../reducers/blogListReducer";
import Users from "./Users";
import User from "./User";
import BlogView from "./BlogView";
import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom"

const Content = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogs())  
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Blogs />}/>
        <Route path='/users' element={<Users />}/>
        <Route path='/users/:id' element={<User/>}/>
        <Route path='blogs/:id' element={<BlogView/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default Content;
