import { Button, Popconfirm, Table, message, Input } from "antd";
import { useMemo, useState } from "react";

import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

// api
import {
  useGetProductsQuery,
  useRemoveProductMutation,
} from "../../../api/product";
import { IBooks } from "../../../interfaces/book";

// chính
const Index = () => {
  const user = useSelector(
    (state: any) => state.user
  ); /* chưa xong đang sửa lỗi */
  const [removeBook, { isLoading: isRemoveLoading }] =
    useRemoveProductMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: BooksData } = useGetProductsQuery();

  const dataSource = useMemo(() => {
    if (BooksData) {
      return BooksData["docs"].map(
        (
          {
            _id: id,
            name,
            price,
            original_price,
            author,
            title,
            description,
            images,
          }: IBooks,
          index: number
        ) => ({
          key: id,
          name,
          index,
          price,
          original_price,
          author,
          title,
          description,
          images,
        })
      );
    }
    return [];
  }, [BooksData]);

  const confirm = (id: number | string) => {
    removeBook(id)
      .unwrap()
      .then(() => {
        messageApi.open({
          type: "success",
          content: "delete successfully",
        });
      });
  };

  const columns = [
    {
      title: "Id",
      key: "index",
      dataIndex: "index",
      width: 50,
      render: (index: number) => `${index + 1}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      editable: true,
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      width: "10%",
      editable: true,
    },
    {
      title: "original_price",
      dataIndex: "original_price",
      key: "original_price",
      width: "10%",
      editable: true,
    },
    {
      title: "author",
      dataIndex: "author",
      key: "author",
      width: "10%",
      editable: true,
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      width: "10%",
      editable: true,
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      width: "10%",
      editable: true,
    },
    {
      title: "images",
      dataIndex: "images",
      key: "images",
      width: "10%",
      editable: true,
      render: (images: any) => {
        console.log("Images data:", images); // Kiểm tra dữ liệu
        return (
          <div>
            {images.map((image: any, index: any) => (
              <img
                key={index}
                src={image.url}
                alt={`Image${index}`}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            ))}
          </div>
        );
      },
    },

    {
      render: ({ key: id }: { key: number | string }) => (
        <div className="flex space-x-2">
          {contextHolder}
          <Popconfirm
            title="Bạn chắc muốn xóa chứ !"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Xóa"
              )}
            </Button>
          </Popconfirm>

          <Link to={`/admin/category/edit/${id}`}>
            <Button type="primary" danger>
              Sửa{" "}
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  // search
  //TODO
  const [searchText, setSearchText] = useState<string>("");
  const filteredDataSource = dataSource?.filter((record: any) =>
    Object.keys(record).some(
      (key) =>
        typeof record[key] === "string" &&
        record[key].toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="relative h-screen">
      <div className="bg-red-500 py-3 max-w-[130px] text-center rounded-md my-2">
        <a href="product/add">
          <button>thêm sản phẩm</button>
        </a>
      </div>

      <div className="flex items-center gap-44">
        {/* search */}
        <Input.Search
          placeholder="Tìm kiếm sản phẩm"
          onSearch={(value: string) => setSearchText(value)}
          style={{ marginBottom: 16 }}
        />
      </div>
      <Table dataSource={filteredDataSource} columns={columns} />
    </div>
  );
};

export default Index;
