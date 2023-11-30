import { Link, useNavigate, useLocation } from "react-router-dom";
import Example from "../slideShow/SlideShow";
import { Pagination } from "antd";
import { useGetProductsPageQuery } from "../../api/product";
import { useEffect, useState } from "react";
import { Alert, Flex, Spin } from "antd";

const Card = () => {
  const [paginate, setPaginate] = useState(1);
  const { data: getProduct }: any = useGetProductsPageQuery({ page: paginate });

  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (page: number) => {
    setPaginate(page);
    navigate(`/books?_page=${page}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("_page");

    if (pageParam) {
      const page = parseInt(pageParam, 10);
      setPaginate(page);
    }
  }, [location.search]);

  return (
    <section className="text-gray-600 body-font max-w-7xl mx-auto mt-10">
      <Example />

      <h1 className="font-bold my-2 font-mono text-2xl">Tất cả sản phẩm</h1>
      <div className="flex items-center justify-center container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          {getProduct?.docs.map((product: any, index: number): any => {
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
                    to={`detail/${product._id}`}
                  >
                    Mua
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-6">
        {getProduct ? (
          <Pagination
            defaultCurrent={1}
            total={getProduct ? getProduct.totalDocs : 0}
            pageSize={8}
            current={paginate}
            onChange={handlePageChange}
          />
        ) : (
          <div>
            <Flex gap="large" vertical>
              <Spin tip="Loading...">
                <Alert
                  className="mt-4 "
                  message="Dữ liệu đang load"
                  description="Chờ trong ít phút."
                  type="info"
                />
              </Spin>
            </Flex>
          </div>
        )}
      </div>
    </section>
  );
};

export default Card;
