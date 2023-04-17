import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";

const SingleUser = () => {
  const allUsers = useSelector((state) => state.allUsers);

  const { id } = useParams();

  const user = allUsers.find((user) => user.id === id);

  if (!user) return <h1 className="text-info">Loading...</h1>;

  return (
    <div className="p-3 text-info">
      <h1>Single User</h1>
      <Table striped bordered hover variant="light">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Added blogs</td>
            <td>
              {user.blogs.length > 0 ? (
                user.blogs.map((blog) => <div key={blog.id}>{blog.title}</div>)
              ) : (
                <p>No blogs added.</p>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default SingleUser;
