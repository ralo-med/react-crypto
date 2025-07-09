import { useOutletContext } from "react-router-dom";
import { users } from "../../db";

interface UserContext {
  name: string;
}

function Followers() {
  const { name } = useOutletContext<UserContext>();
  return (
    <div>
      Followers of {name}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Followers;
