import React, { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "../../api/product";

const CategoryHome = ({ data }: any) => {
  const [getProduct, setProducts] = useState([]);
  console.log(data);

  // Sử dụng useEffect để theo dõi thay đổi của data và gọi useGetProductByIdQuery khi data thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await Promise.all(
          data.map(async (item: any) => {
            const result = await useGetProductByIdQuery(item._id).unwrap();
            return result;
          })
        );

        // Set state với dữ liệu lấy được
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [data]);
  console.log(getProduct);
  return <div></div>;
};

export default CategoryHome;
