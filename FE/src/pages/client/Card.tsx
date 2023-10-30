import React from "react";
import {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
} from "../../api/categories";
import { useGetProductsQuery, useGetProductByIdQuery } from "../../api/product";
import { Link } from "react-router-dom";

const Card = () => {
  const { data: getCategory } = useGetCategoriesQuery();
  const { data: getProduct } = useGetProductsQuery();

  // const {data: getProductId} = useGetProductByIdQuery();
  // const {data: getCategoryId} = useGetCategoryByIdQuery(id || "");

  return (
    <section className="text-gray-600 body-font max-w-7xl mx-auto">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
          {getCategory ? getCategory[1].name : null}
        </h1>
        <div className="flex flex-wrap -m-4">
          {getProduct?.docs.map((product: any): any => {
            console.log(product);

            return (
              <div className="p-4 lg:w-1/4 md:w-1/2 w-full">
                <Link to={`detail/${product._id}`}>
                  <div className="h-full flex flex-col items-center text-center relative">
                    <img
                      alt="team"
                      className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4 "
                      src={product.images[0].url}
                    />
                    <h1 className="absolute right-0 top-3 p-2 text-[white] text-2xl  bg-red-500 z-10 rounded-s-3xl">
                      10%
                    </h1>
                    <div className="w-full">
                      <h2 className="title-font font-medium text-lg text-gray-900">
                        {product.name}
                      </h2>
                      <h3 className="text-gray-500 mb-3">UI Developer</h3>
                      <p className="mb-4 text-[red] font-bold">
                        {product.price} VND
                      </p>
                      <span className="inline-flex">
                        <a className="text-gray-500">
                          <button className="bg-red-500 rounded-full px-24">
                            Đã bán
                          </button>
                        </a>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Card;
