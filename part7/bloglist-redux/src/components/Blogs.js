import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Anchor, Container, Stack } from "@mantine/core";

const Blogs = () => {
  const blogComparator = (a, b) => (a.likes <= b.likes ? 1 : -1);
  const blogList = useSelector((state) => state.blogList);
  const blogs = [...blogList].sort(blogComparator);

  return (
    <Container fluid>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      <Stack align="flex-start" justify="flex-start" spacing="xs">
        {blogs.map((b) => (
          <Anchor key={b.id} component={Link} to={`/blogs/${b.id}`}>
            {b.title} {b.author}
          </Anchor>
        ))}
      </Stack>
    </Container>
  );
};

export default Blogs;
