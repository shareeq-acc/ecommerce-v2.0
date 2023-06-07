import React from "react";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Elements/Button/Button";
import Sidebar from "../../components/Elements/Sidebar/Sidebar";
import SidebarCloseButton from "../../components/Elements/Sidebar/SidebarCloseButton";

type FilterSideBarProps = {
  onFilterPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFilterTabs: Boolean;
  setShowFilterTabs: (value: Boolean) => void;
};
const FilterSideBar = ({
  onFilterPriceChange,
  showFilterTabs,
  setShowFilterTabs,
}: FilterSideBarProps) => {
  const data = {
    brands: ["apple", "samsung", "xiomi", "oneplus"],
  };
  return (
    <Sidebar
      showSidebar={showFilterTabs}
      className="search-page__sidebar"
      sidebarResponsiveClass="search-page__responsive-sidebar"
    >
      {showFilterTabs && (
        <SidebarCloseButton setShowButton={setShowFilterTabs} className="search__sidebar__close-btn-wrap"/>
      )}
      <div className="brand-filters-wrap">
        <h3 className="filter__title">Brands</h3>
        {data.brands.map((brand, index) => {
          return (
            <div className="brand-filter" key={index}>
              <input
                className="brand__checkbox"
                type={"checkbox"}
                value={brand}
                name={brand}
              />
              <label className="brand__label" htmlFor={brand}>
                {brand.toUpperCase()}
              </label>
            </div>
          );
        })}
      </div>
      <div className="price-filter-wrap">
        <h3 className="filter__title">Price</h3>
        <div className="price-filter__div">
          <input
            className="filter-price__input minimum"
            placeholder="Min"
            type={"number"}
            name="min"
            min="0"
            onChange={onFilterPriceChange}
          />
          <input
            className="filter-price__input maximum"
            placeholder="Max"
            type={"number"}
            name="max"
            max={999999}
            onChange={onFilterPriceChange}
          />
          <Button className="price-filter__btn btn">
            <span onClick={() => setShowFilterTabs(false)}>
              <FontAwesomeIcon icon={faFilter} className="price-search-icon" />
            </span>
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default FilterSideBar;
