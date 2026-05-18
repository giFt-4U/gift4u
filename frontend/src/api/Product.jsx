import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Product() {

  const [product, setProduct] = useState(null);

  useEffect(() => {

    axiosInstance
      .get("/api/products/1")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  if (!product) {
    return <div>로딩중...</div>;
  }

  return (
    <div>

      <img
        src={product.imageUrl}
        alt={product.name}
        width="300"
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>{product.price}원</h2>

    </div>
  );
}

export default Product;