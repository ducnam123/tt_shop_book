import { message } from "antd";
import { useForgotPasswordAuthMutation } from "../../api/auth";
import { ChangeEvent, useState } from "react";

const ForgotAuth = () => {
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [forgotPasswordAuth] = useForgotPasswordAuthMutation();

  const forgotPassword = () => {
    const body = {
      email,
    };
    console.log(body);
    forgotPasswordAuth(body)
      .unwrap()
      .then((response) => {
        localStorage.setItem("forgotToken", response.accessCode);
        messageApi.success(response.message + ", vui lòng kiểm tra email");
      })
      .catch((error) => {
        messageApi.error(error.data.message);
      });
  };

  return (
    <>
      {contextHolder}

      <div className="flex justify-center mt-10 mb-28">
        <div className="bg-slate-700 bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full pb-20">
          <h2 className="text-white text-4xl mb-8 font-semibold text-center">
            Quên mật khẩu
          </h2>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                value={email}
                id="email"
                type="email"
                placeholder=""
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-black bg-white border appearance-none focus:outline-none focus:ring-0 invalid:border-b-1 peer mb-3"
              />
              <label className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-1 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                Email
              </label>
            </div>

            <button
              onClick={forgotPassword}
              className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full p-3 bg-blue-500 text-white

      `}
            >
              Lấy lại mật khẩu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotAuth;
