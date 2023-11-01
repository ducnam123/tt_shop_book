// reducers/authReducer.js
const initialState = {
  // Các trạng thái khác của người dùng
  user: null,
  accessToken: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
