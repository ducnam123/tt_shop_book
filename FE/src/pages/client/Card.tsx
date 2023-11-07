import { useGetCategoriesQuery } from "../../api/categories";
import { useGetProductsQuery } from "../../api/product";
import { Link } from "react-router-dom";
import Example from "../slideShow/SlideShow";

const Card = () => {
  const { data: getCategory } = useGetCategoriesQuery();
  const { data: getProduct }: any = useGetProductsQuery();

  return (
    <section className="text-gray-600 body-font max-w-7xl mx-auto mt-10">
      <Example />

      {/* <div className="container px-5 py-24 mx-auto">
        <h1 className=" text-2xl font-medium title-font mb-4 text-gray-900">
          {getCategory ? getCategory[1]?.name : null}
        </h1>
        <div className="flex flex-wrap -m-4">
          {getProduct?.docs.map((product: any, index: number): any => {
            console.log(product, index);

            return (
              <div
                className="p-4 lg:w-1/4 md:w-1/2 w-full hover:border hover:rounded-xl hover:shadow mt-2"
                key={index}
              >
                <Link to={`detail/${product._id}`}>
                  <div className="h-full flex flex-col relative">
                    <img
                      alt="team"
                      className="flex-shrink-0 rounded-lg w-full h-60 object-contain mb-4 "
                      src={product.images[0].url}
                    />
                    <h1 className="absolute right-0 top-3 p-2 text-[white] text-2xl  bg-red-500 z-10 rounded-s-3xl">
                      10%
                    </h1>
                    <div className="w-full">
                      <h2 className="title-font font-medium text-lg text-gray-900">
                        {product.name}
                      </h2>
                      <div className="flex justify-between">
                        <p className="text-[red] font-bold">
                          {product.price} VND
                        </p>

                        <button className="bg-red-500  px-4 rounded-lg text-white">
                          Tập 1
                        </button>
                      </div>

                      <h3 className="text-gray-500 mb-3">UI Developer</h3>
                    </div>

                    <div className="text-center">
                      <a className="text-gray-500">
                        <button className="bg-red-500 rounded-full px-24">
                          Đã bán
                        </button>
                      </a>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div> */}

      <h1 className="font-bold my-2 font-mono text-2xl">Sách chính trị</h1>
      <div className="flex items-center justify-center container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {getProduct?.docs.map((product: any, index: number): any => {
            console.log(product.images[0].url);
            return (
              <div className="card" key={index}>
                <div className="p-5 flex flex-col">
                  <div className="rounded-xl overflow-hidden  flex flex-col mx-auto">
                    <img src={product.images[0].url} alt="" className="h-60" />
                  </div>
                  <h5 className="text-2xl md:text-2xl font-medium mt-3">
                    {product.name}
                  </h5>
                  <p className="text-slate-500 text-lg mt-3">
                    {product.price} VND
                  </p>
                  <Link
                    className="text-center bg-blue-400 text-blue-700 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 focus:scale-95 transition-all duration-200 ease-out"
                    to={`detail/${product._id}`}
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Card;
