import { useGetHomeProductsQuery } from "../../../features/api/productsApi";
import { ProductContainerType } from "../../types/productTypes";
import Banner from "./Banner";
import ProductsContainer from "./ProductsContainer";

const HomePage = () => {
  console.log(process.env.REACT_APP_API_KEY);
  const { data, error, isLoading } = useGetHomeProductsQuery("");
  return (
    <div className="home container--padding">
      <Banner />
      {isLoading && <p>Loading.....</p>}
      {error && <p>Error</p>}
      {data?.products &&
        data.products.map((item:ProductContainerType, index: number) => (
          <ProductsContainer data={item} key={index} />
        ))}
    </div>
  );
};

export default HomePage;
