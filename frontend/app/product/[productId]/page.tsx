import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";

interface IParams {
  productId: string;
}

const Product = ({ params }: { params: IParams }) => {
  const productId = params.productId;
  // Find the product from the list
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;