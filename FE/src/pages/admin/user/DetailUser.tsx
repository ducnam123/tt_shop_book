import { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Radio,
  Select,
  Skeleton,
  Upload,
  message,
} from "antd";
import { AiOutlineLoading3Quarters, AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditUsersMutation,
  useGetUserByIdQuery,
  useRemoveUsersMutation,
} from "../../../api/auth";
import { pause } from "../../../utils/pause";
import { IAuth } from "../../../interfaces/auth";

// load ảnh update
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

// const chính
const DetailUser = () => {
  const navigate = useNavigate();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  // xóa tài khoản
  const [messageApi, contextHolder] = message.useMessage();
  const [removeUser, { isLoading: isRemoveLoading }] = useRemoveUsersMutation();
  const confirm = (id: number | string) => {
    removeUser(id)
      .unwrap()
      .then(() => {
        messageApi.open({
          type: "success",
          content: "delete successfully",
        });
      });
  };
  // lấy id
  const { id } = useParams<{ id: string }>();
  // cập nhật tài khoản
  const [updateUser, { isLoading: isUpdateLoading }] = useEditUsersMutation();
  // lấy 1 tài khoản
  const { data: userData, isLoading: isGetUsersLoading } = useGetUserByIdQuery(
    id || ""
  );
  // thông tin form cập nhật
  const [form] = Form.useForm();
  // ____________________________________

  useEffect(() => {
    // đồng bộ dữ liệu từ API fill vào form
    form.setFieldsValue({
      name: userData?.user?.name,
      email: userData?.user?.email,
      gender: userData?.user?.gender,
      role: userData?.user?.role,
      address: userData?.user?.address,
      displayName: userData?.user?.displayName,
      avatar: userData?.user?.avatar,
    });
  });

  // cập nhật thành công
  const onFinish = (values: any) => {
    const avatarUrl =
      values.avatar && values.avatar[0]
        ? values.avatar[0]?.response?.url || values.avatar[0]?.url
        : null;

    const updateValues = {
      ...values,
      id,
      avatar: [{ url: avatarUrl }],
    };

    updateUser(updateValues)
      .unwrap()
      .then(async () => {
        console.log("Update success");
        await pause(200);
        navigate("/admin/user");
      });
  };

  // cập nhật thất bại
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  if (isGetUsersLoading) return <Skeleton />;

  // * lưu thông tin ảnh lên mạng
  // const [imageReceived, setImageReceived] = useState(false);

  return (
    <>
      {contextHolder}
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
        className="my-4"
      >
        Form disabled
      </Checkbox>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
        className="w-full"
      >
        <div className="">
          <Form.Item<IAuth> label="Tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item<IAuth> label="Tên hiển thị:" name="displayName">
            <Input />
          </Form.Item>

          <Form.Item<IAuth> label="email" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item<IAuth> label="Nơi ở:" name="address">
            <Input />
          </Form.Item>

          <Form.Item<IAuth> label="Role" name="role">
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="member">Member</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<IAuth>
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="avatar"
          >
            <Upload
              action="https://api.cloudinary.com/v1_1/da83kzvpb/image/upload"
              data={{
                upload_preset: "shopBook",
              }}
              listType="picture-card"
            >
              <div>
                <AiOutlineUserAdd />
                <div style={{ marginTop: 8 }}>Ảnh</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item<IAuth> label="Giới tính" name="gender">
            <Radio.Group>
              <Radio value="girl"> Gái </Radio>
              <Radio value="man"> Trai </Radio>
              <Radio value="Unknown"> Không xác định </Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            {isUpdateLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Cập nhật sản phẩm"
            )}
          </Button>

          {/* FIXME */}
          <Popconfirm
            title="Bạn chắc muốn xóa chứ !"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(id!)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger className=" ml-2">
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Xóa tài khoản"
              )}
            </Button>
          </Popconfirm>

          <Button
            className="ml-2"
            type="primary"
            danger
            htmlType="submit"
            onClick={() => navigate("/admin/user")}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DetailUser;
