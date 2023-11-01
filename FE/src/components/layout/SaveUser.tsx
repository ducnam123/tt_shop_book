import { useSelector } from "react-redux";

const SaveUser = () => {
  // FIXME fix hiện tên tài khoản layoutAdmin header
  const auth = useSelector((state: any) => {
    // Get the dynamic key (action name) from the state
    const dynamicKey = Object.keys(state.auth.mutations)[0];
    const authData = state.auth.mutations[dynamicKey];

    // Access the data you need
    const accessToken = authData.data.accessToken;
    const user = authData.data.user;

    console.log("AccessToken:", accessToken);
    console.log("User Data:", user);

    return {
      accessToken,
      user,
    };
  });
};

export default SaveUser;
