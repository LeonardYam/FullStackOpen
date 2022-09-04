import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const blogList = [...useSelector((state) => state.blogList)];
  const user = blogList.length !== 0 && blogList.find(b => b.creator.id === id).creator
  
  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <div>
          <h3>added blogs</h3>
          <ul>{blogList.map(b => b.creator.id === id && <li key={b.title}>{b.title}</li>)}</ul>
        </div>
      </div>
    )
  );
};

export default User;
