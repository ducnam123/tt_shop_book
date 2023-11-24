import { Button, Form, Input, message } from "antd";
import { IAuth } from "../../interfaces/auth";
import { useForgotPasswordAuthMutation } from "../../api/auth";

const ForgotAuth = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [forgotPasswordAuth] = useForgotPasswordAuthMutation();

  const onFinish = async (value: any) => {
    console.log(value);
    try {
      const { email } = value;
      forgotPasswordAuth(email)
        .unwrap()
        .then((response) => {
          console.log(
            "🚀 ~ file: Forgotauth.tsx:26 ~ .then ~ response:",
            response
          );

          localStorage.setItem("forgotToken", response.accessCode);
          messageApi.success(response.message + ", vui lòng kiểm tra email");
        });
    } catch (error: any) {
      console.log(error!.data.message);
    }
  };

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
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email format" },
          ]}
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

export default ForgotAuth;
