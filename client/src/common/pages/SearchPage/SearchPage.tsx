import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSideBar from "./FilterSideBar";
import SearchContent from "./SearchContent";

const SearchPage = () => {
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 0 });
  const [showFilterTabs, setShowFilterTabs] = useState<Boolean>(false);
  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get("value") || "";

  const handleFilterPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter({
      ...priceFilter,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="search-page container--padding section--margin">
      <FilterSideBar
        onFilterPriceChange={handleFilterPriceChange}
        showFilterTabs={showFilterTabs}
        setShowFilterTabs={setShowFilterTabs}
      />
      <SearchContent
        showFilterTabs={showFilterTabs}
        setShowFilterTabs={setShowFilterTabs}
        searchValue={searchValue}
      />
    </div>
  );
};

export default SearchPage;
