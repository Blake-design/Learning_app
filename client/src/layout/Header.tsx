import { LoginButton } from "../components";
import "./header.css";

const Header = () => {
  return (
    <header className={"dark"}>
      <h1>The Learning App</h1>

      <LoginButton />
    </header>
  );
};

export default Header;