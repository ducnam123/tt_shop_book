import { Button, Popconfirm, Table, message, Input } from "antd";
import { useMemo, useState } from "react";
import { ICategory } from "../../../interfaces/categorys";
import Add from "./Add";
import {
  useGetCategoriesQuery,
  useRemoveCategoryMutation,
} from "../../../api/categories";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useSelector } from "react-redux";

const Categoryes = () => {
  const user = useSelector((state: any) => state.user);
  console.log(user);
  const { data: categoryData } = useGetCategoriesQuery();
  const [removeCategory, { isLoading: isRemoveLoading }] =
    useRemoveCategoryMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const dataSource = useMemo(() => {
    if (categoryData) {
      return categoryData.map(({ id: id, name }: ICategory, index) => ({
        key: id,
        name,
        index,
      }));
    }
    return [];
  }, [categoryData]);

  const confirm = (id: number | string) => {
    removeCategory(id)
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
      width: "55%",
      editable: true,
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
      <Add />
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

export default Categoryes;
