// phần đăng nhập lưu thông tin vào redux
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      // Cập nhật trạng thái người dùng
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      // Xóa thông tin người dùng khi đăng xuất
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// người dùng ẩn danh
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentTokenr = (state: any) => state.auth.token;
