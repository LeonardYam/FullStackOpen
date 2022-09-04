import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Title, Anchor, Table } from "@mantine/core";

const Users = () => {
  const users = {};
  const blogList = useSelector((state) => state.blogList);
  blogList.forEach((blog) => {
    const { creator } = blog;
    if (!users[creator.id]) {
      users[creator.id] = { name: creator.name, likes: 1 };
    } else {
      users[creator.id].likes += 1;
    }
  });

  const sortedUsers = Object.entries(users).sort((a, b) =>
    a[1].likes < b[1].likes ? 1 : -1
  );

  //Assume no name is bigger than 24 chars for padding
  return (
    <Container fluid>
      <Title order={2}>Users</Title>
      <Table horizontalSpacing="xs" highlightOnHover striped>
        <thead>
          <tr>
            <th>names</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((u) => (
            <tr key={u[0]}>
              <td>
                <Anchor component={Link} to={`/users/${u[0]}`}>
                  {u[1].name}
                </Anchor>
              </td>
              <td>{u[1].likes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
