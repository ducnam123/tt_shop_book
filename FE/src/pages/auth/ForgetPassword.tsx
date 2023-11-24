import { Button, Form, Input, message } from "antd";
import { IAuth } from "../../interfaces/auth";
import { useResetPasswordAuthMutation } from "../../api/auth";
import { useNavigate, useParams } from "react-router-dom";

const ForgetPassword = () => {
  const param = useParams<{ id: string }>();
  const [forget, { error }]: any = useResetPasswordAuthMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log(
      "🚀 ~ file: ForgetPassword.tsx:11 ~ onFinish ~ values:",
      values
    );

    values.randomString = param.id;

    // await forget({
    //   name: values.name,
    //   email: values.email,
    //   password: values.password,
    //   confirmPassword: values.confirmPassword,
    // })
    forget(values)
      .unwrap()
      .then(() => {
        navigate("/user/login");
      });
  };

  if (error) {
    if ("data" in error) {
      messageApi.open({
        type: "error",
        content: error?.data?.message,
      });
    }
  }

  return (
    <div
      className="max-w-3xl m-auto shadow py-20  flex flex-col justify-center my-20 rounded-2xl
    "
    >
      {contextHolder}
      <h1 className="text-center font-bold mb-10">Lấy lại mật khẩu</h1>
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
          label="Password"
          name="password"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<any>
          label="Mã bảo mật"
          name="randomCode"
          rules={[{ required: true, message: "Tên không được để trống!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Submit
          </Button>
          <h1 className="flex gap-1 mt-2">
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

export default ForgetPassword;
