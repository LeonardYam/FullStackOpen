import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog, deleteBlog } from "../reducers/blogListReducer";

const BlogView = () => {
  const { id } = useParams();
  const blog = useSelector((state) => state.blogList.find((b) => b.id === id));
  const user = useSelector((state) => state.user);
  const isCreator = user.username === blog.creator.username;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLikeClick = () => {
    dispatch(updateBlog({ id: blog.id, likes: blog.likes + 1 }));
  };

  const handleDeleteClick = () => {
    window.confirm(`Delete ${blog.title}?`) && dispatch(deleteBlog(blog));
    navigate("../../");
  };

  return (
    blog && (
      <div>
        <h2>{blog.title}</h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={handleLikeClick}>like</button>
        </div>
        <div>added by {blog.creator.name}</div>
        {isCreator && (
          <div>
            <button onClick={handleDeleteClick}>delete</button>
          </div>
        )}
      </div>
    )
  );
};

export default BlogView;
