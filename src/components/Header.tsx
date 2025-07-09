import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const onAboutClick = () => {
    navigate("/about");
  };
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <button onClick={onAboutClick}>About</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
