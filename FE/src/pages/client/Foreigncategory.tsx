import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
} from "../../api/categories.tsx";
import { ICategory } from "../../interfaces/categorys.ts";
import { Link, useParams } from "react-router-dom";

const Foreigncategory = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCategoriesQuery();
  const { data: dataCategoryId }: any = useGetCategoryByIdQuery(id!);
  const [getCategory, setCategory] = useState<ICategory[]>([]);
  const [getCategoryId, setCategoryId]: any = useState([]);

  useEffect(() => {
    if (data) setCategory(data!);
    if (dataCategoryId) setCategoryId(dataCategoryId);
  }, [dataCategoryId]);

  return (
    <div className="max-w-7xl mx-auto h-screen mt-2">
      <div className="grid grid-cols-[200px,1fr] h-screen gap-4">
        <div className="bg-white pl-3">
          <h1>Danh mục:</h1>

          {getCategory
            ? getCategory.map((category: ICategory, index: number) => {
                return (
                  <div
                    key={index}
                    className={
                      id === category._id
                        ? "shadow mr-4 text-[white] bg-blue-500 py-2 rounded-xl px-4"
                        : ""
                    }
                  >
                    <Link
                      to={`/foreigncategory/${category.name}/${category._id}`}
                      key={index}
                    >
                      <div>{category.name}</div>
                    </Link>
                  </div>
                );
              })
            : ""}
        </div>

        <div className="bg-white">
          <div>
            <h1>Danh mục: {getCategoryId.name}</h1>
          </div>

          <section className="text-gray-600 body-font max-w-7xl mx-auto mt-10">
            <div className="flex items-center justify-center container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                {dataCategoryId
                  ? dataCategoryId?.books.map(
                      (product: any, index: number): any => {
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
                                to={`/detail/${product._id}`}
                              >
                                Chi tiết
                              </Link>
                            </div>
                          </div>
                        );
                      }
                    )
                  : ""}
                {dataCategoryId?.books?.length > 0 ? "" : "Không có sản phẩm"}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Foreigncategory;
