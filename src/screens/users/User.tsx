import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
  const { id } = useParams();
  return (
    <div>
      User {id} {users.find((user) => user.id === Number(id))?.name}
      <hr />
      <Link to="followers">Followers</Link>
      <Outlet
        context={{ name: users.find((user) => user.id === Number(id))?.name }}
      />
    </div>
  );
}

export default User;
