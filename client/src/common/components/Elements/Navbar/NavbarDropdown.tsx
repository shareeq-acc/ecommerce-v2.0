import { Link } from "react-router-dom";
import DropdownItem from "../Dropdown/DropdownItem";
import DropdownWrapper from "../Dropdown/DropdownWrapper";

type NavbarDopdownProps = {
  // ref:  React.RefObject<HTMLDivElement>;
};

const NavbarDropdown = ({} : NavbarDopdownProps) => {
  return (
    <DropdownWrapper className={"main-nav__dropdown"}>
      <DropdownItem className={"main-nav__dropdown__item"}>
        <Link to={"/user/account"}>Account</Link>
      </DropdownItem>
      <DropdownItem className={"main-nav__dropdown__item"}>Logout</DropdownItem>
    </DropdownWrapper>
  );
};

export default NavbarDropdown;
