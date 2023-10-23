import React from "react";
import { Button, Form, Input, message } from "antd";
import { IAuth } from "../../interfaces/auth";
import { useSignupMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signup, { error }]: any = useSignupMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    await signup({
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    })
      .unwrap()
      .then(() => {
        navigate("/user/login");
      });

    if (error) {
      if ("data" in error) {
        messageApi.open({
          type: "error",
          content: error?.data?.message,
        });
      }
    }
  };

  return (
    <div
      className="max-w-3xl m-auto shadow py-20  flex flex-col justify-center my-20 rounded-2xl
    "
    >
      {contextHolder}
      <h1 className="text-center font-bold mb-10">Đăng Ký</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<IAuth>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Tên không được để trống!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IAuth>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IAuth>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* confirmPassword */}
        <Form.Item<IAuth>
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Confirm password is required" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error("mật khẩu không khớp"));
                }
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Submit
          </Button>
          <h1 className="flex gap-1 mt-2">
            feeeee
            <p>Bạn đã có tài khoản hãy</p>
            <a href="/user/login">
              <h1 className="text-[red] font-bold">đăng nhập!</h1>
            </a>
          </h1>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
