import { useEffect } from "react";

import { Button, Form, Input, Radio, Skeleton, Upload, message } from "antd";
import { AiOutlineLoading3Quarters, AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useEditUsersMutation, useGetUserByIdQuery } from "../../api/auth";
import { pause } from "../../utils/pause";
import { IAuth } from "../../interfaces/auth";

// load ảnh update
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

const DetailUserHome = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const userGet = localStorage.getItem("userData");
  const getuser = JSON.parse(userGet!);

  // cập nhật tài khoản
  const [updateUser, { isLoading: isUpdateLoading }] = useEditUsersMutation();
  // lấy 1 tài khoản
  const { data: userData, isLoading: isGetUsersLoading } = useGetUserByIdQuery(
    id || ""
  );

  console.log(
    "🚀 ~ file: DetailUser.tsx:41 ~ DetailUserHome ~ userData:",
    userData
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
      address: userData?.user?.address,
      displayName: userData?.user?.displayName,
      avatar: userData?.user?.avatar,
      password: userData?.user?.password,
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
        localStorage.setItem("userData", JSON.stringify({ updateValues }));
      })
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

      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        className="w-full max-w-7xl m-auto shadow-2xl rounded-3xl py-20 mt-4 mb-24"
      >
        <h1 className="text-center font-bold mb-10">Thông tin tài khoản</h1>

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

          <Form.Item<IAuth> label="password" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item<IAuth> label="Nơi ở:" name="address">
            <Input />
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
              "Thay đổi"
            )}
          </Button>

          {/* FIXME */}
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

export default DetailUserHome;
