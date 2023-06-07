import ReactMarkdown from "react-markdown";

type ProductDescriptionProps = {
  description: string;
};
const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div className="product-description markdown-content">
      <ReactMarkdown children={description} />
    </div>
  );
};

export default ProductDescription;
