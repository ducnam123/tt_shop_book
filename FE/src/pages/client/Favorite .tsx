import React from "react";
import { useGetFavoritesByUserQuery } from "../../api/auth";
import { Link } from "react-router-dom";

const Favorite = () => {
  const { data: getFavorite } = useGetFavoritesByUserQuery();
  console.log("🚀 ~ file: Favorite .tsx:6 ~ Favorite ~ data:", getFavorite);

  return (
    <div className="text-[red] rounded-md  ml-10">
      Sản phẩm yêu thích
      <div className="flex items-center justify-center container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {getFavorite?.listProducts?.map((product: any, index: number) => {
            return (
              <div className="card" key={index}>
                <div className="p-5 flex flex-col">
                  <div className="rounded-xl overflow-hidden  flex flex-col mx-auto">
                    <img src={product.images[0].url} alt="" className="h-60" />
                  </div>
                  <h5 className="text-2xl md:text-[16px] font-medium mt-3">
                    {product.name}
                  </h5>
                  <p className="text-slate-500 text-lg mt-3">
                    {product.price} VND
                  </p>
                  <Link
                    className="text-center bg-blue-400 text-blue-700 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 focus:scale-95 transition-all duration-200 ease-out"
                    to={`/detail/${product._id}`}
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
