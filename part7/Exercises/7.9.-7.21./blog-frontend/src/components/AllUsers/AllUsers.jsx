import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersFromDb } from "../../reducers/usersReducer";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllUsersFromDb()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div className="text-info p-3">
      <div>
        <div>
          <h1>All users</h1>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {allUsers.map((user, index) => (
              <li key={user.id} className="text-info">
                <p>{index + 1}</p>
                <Link to={`/app/users/${user.id}`}>{user.username}</Link>
                <p>Blogs posted:{user.blogs.length}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
