import { useSearchProductQuery } from "../../api/product";
import { Link, useLocation } from "react-router-dom";

const SearchBook = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const q = query.get("q");

  const { data } = useSearchProductQuery(q!);
  console.log("🚀 ~ file: SearchBook.tsx:8 ~ SearchBook ~ search:", data);

  return (
    <div className="container mx-auto mt-4 items-center">
      <h1>Sản phẩm cần tìm</h1>
      <div className="flex items-center justify-center container mx-auto mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          {data && data?.length > 0 ? (
            data?.map((product: any, index: number): any => {
              return (
                <div className="card" key={index}>
                  <div className="p-5 flex flex-col">
                    <div className="rounded-xl overflow-hidden  flex flex-col mx-auto">
                      <img
                        src={product.images[0].url}
                        alt=""
                        className="h-60"
                      />
                    </div>
                    <h5 className="text-2xl md:text-[16px] font-medium mt-3">
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
            })
          ) : (
            <div>
              <h1>Không tìm thấy sản phẩm cần tìm </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBook;
