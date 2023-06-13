import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import {
  faMagnifyingGlass,
  faCartShopping,
  faBars,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import useComponentVisible from "../../../hooks/useComponentVisible";
import NavbarDropdown from "./NavbarDropdown";

type NavbarProps = {
  setShowCart: (value: Boolean) => void;
  showCart: Boolean;
};

const Navbar = ({ setShowCart, showCart }: NavbarProps) => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue?.trim()?.length) {
      navigate(`/product/search?value=${searchValue}`);
    }
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    setShowDropdown(false);
    console.log("Logout");
  };
  return (
    <header
      className={`nav-header container--padding ${
        scrolled ? "nav--sticky" : ""
      }`}
    >
      <nav className="main-nav">
        <Link to="/" className="main-nav__logo">
          TechShop
        </Link>
        <div
          className="main-nav__toggle-btn"
          onClick={() => setShowNavLinks(showNavLinks ? false : true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <form className="main-nav__search-form" onSubmit={handleSearch}>
          <input
            className="main-nav__form__search-input"
            placeholder="Search Product"
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
          <button className="main-nav__form-search__btn" type="submit">
            <span className="main-nav__search-btn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </button>
        </form>
        <ul
          className={`main-nav__list ${
            showNavLinks ? "show-links" : "hide-links"
          }`}
        >
          {!userLogin && (
            <li
              className="main-nav__list__item"
              onClick={() => setShowNavLinks(false)}
            >
              <Link to={"/auth"} className="main-nav__link link">
                Login/Register
              </Link>
            </li>
          )}

          {userLogin && (
            <li
              className="main-nav__list__item navbar-icon main-nav__user-icon"
              onClick={() =>
                setIsComponentVisible(isComponentVisible ? false : true)
              }
            >
              <span className="main-nav__icon">
                <FontAwesomeIcon icon={faCircleUser} />
              </span>
              {isComponentVisible && <NavbarDropdown />}
            </li>
          )}
          <li
            className="main-nav__list__item"
            onClick={() => {
              setShowNavLinks(false);
              setShowCart(showCart ? false : true);
            }}
          >
            <span className="nav--cart-icon main-nav__icon">
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
