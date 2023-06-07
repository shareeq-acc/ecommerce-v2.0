import {
  faBars,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../../components/Elements/ProductCard/ProductCard";
import { limitCharacters } from "../../utils/string";
import { productsData } from "./data";

type SearchContentProps = {
  showFilterTabs: Boolean;
  setShowFilterTabs: (value: Boolean) => void;
  searchValue: string;
};

const SearchContent = ({
  setShowFilterTabs,
  showFilterTabs,
  searchValue,
}: SearchContentProps) => {
  return (
    <div className="search-page__content-wrap">
      <div className="search-result__top">
        <span className="search-results__count">
          Showing 8 Results for{" "}
          <strong>"{limitCharacters(searchValue, 50)}"</strong>
        </span>
        <div className="search-filters-wrap">
          <div className="toggle-icon-wrap">
            <FontAwesomeIcon
              icon={faBars}
              className="toggle-icon"
              onClick={() => setShowFilterTabs(showFilterTabs ? false : true)}
            />
          </div>
          <div className="search-filters__sort-wrap">
            <label htmlFor="sort" className="sort-label">
              Sort By:{" "}
            </label>
            <select name="sort" className="sort-selection">
              <option value="recent">Recent</option>
              <option value="price-increment">Price Low-High</option>
              <option value="price-decrement">Price High-Low</option>
            </select>
          </div>
        </div>
      </div>
      {/* <div className="search__products-container">
        {productsData.map((item, index) => (
          <ProductCard className={"product"} product={item} key={index} />
        ))}
      </div> */}
      <div className="search__pagination-wrap">
        <ul className="search__pagination-list">
          <li className="pagination-item">
            <FontAwesomeIcon icon={faCaretLeft} />
          </li>
          <li className="pagination-item">1</li>
          <li className="pagination-item">2</li>
          <li className="pagination-item">
            <FontAwesomeIcon icon={faCaretRight} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchContent;
