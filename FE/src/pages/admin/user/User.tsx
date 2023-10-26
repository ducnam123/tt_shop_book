import React, { useMemo } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetUsersQuery } from "../../../api/auth";
import { IAuth } from "../../../interfaces/auth";

const columns: ColumnsType<any> = [
  {
    title: "Id",
    width: 50,
    dataIndex: "index",
    key: "index",
    fixed: "left",
    render: (index) => `${index + 1}`,
  },
  {
    title: "displayName",
    width: 120,
    dataIndex: "displayName",
    key: "displayName",
    fixed: "left",
  },
  {
    title: "address",
    dataIndex: "address",
    key: "1",
    width: 150,
  },
  {
    title: "gender",
    dataIndex: "gender",
    key: "2",
    width: 150,
  },
  {
    title: "name",
    dataIndex: "name",
    key: "3",
    width: 150,
  },
  {
    title: "email",
    dataIndex: "email",
    key: "4",
    width: 150,
  },
  {
    title: "role",
    dataIndex: "role",
    key: "5",
    width: 150,
  },
  {
    title: "Action",
    dataIndex: "isActive",
    key: "5",
    width: 150,
    render: (dataIndex) => `${dataIndex == "false" ? "online" : "off"}`,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: (dataUser: any) => (
      <a href={`/admin/user/edit/${dataUser.key}`}>
        <button className="bg-blue-500 p-2 rounded-xl text-white hover:bg-red-500">
          Chi tiết
        </button>
      </a>
    ),
  },
];

const User: React.FC = () => {
  const { data: dataUser } = useGetUsersQuery();

  const dataSource = useMemo(() => {
    if (dataUser) {
      return dataUser.map(
        (
          {
            _id,
            displayName,
            email,
            address,
            isActive,
            avatar,
            role,
            gender,
            name,
          }: IAuth,
          index
        ) => ({
          index,
          key: _id,
          email,
          name,
          displayName,
          isActive,
          address,
          avatar,
          role,
          gender,
        })
      );
    }
  }, [dataUser]);
  console.log("🚀 ~ file: User.tsx:110 ~ dataSource ~ dataSource:", dataSource);

  return (
    <div className="h-screen">
      <h1 className="font-bold text-2xl my-10">
        Thông tin tất cả các tài khoản
      </h1>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1500, y: 580 }}
      />
    </div>
  );
};

export default User;
