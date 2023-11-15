import { Button, Form, Input, message } from "antd";
import { IAuth } from "../../interfaces/auth";
import { useSigninMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signin, { error }]: any = useSigninMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    await signin({
      email: values.email,
      password: values.password,
    })
      .unwrap()
      .then((userData: any) => {
        // const img = userData.user.avatar[0].url;
        // userData.user.avatar = img;
        localStorage.setItem("Token", JSON.stringify(userData.accessToken));
        localStorage.setItem("Auth", JSON.stringify(userData.user));
      })

      .then(() => {
        navigate("/");
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
      <h1 className="text-center font-bold mb-10">Đăng nhập</h1>
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Submit
          </Button>
          <h1 className="flex gap-1 mt-2">
            <p>Bạn chưa có tài khoản hãy</p>{" "}
            <a href="/user/signup">
              <h1 className="text-[red] font-bold">đăng ký!</h1>
            </a>
          </h1>

          <h1 className="flex gap-1 mt-2">
            <p>Bạn đã có tài khoản nhưng quên mật khẩu</p>
            <a href="/user/forget">
              <h1 className="text-[red] font-bold">lấy lại mật khẩu!</h1>
            </a>
          </h1>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
