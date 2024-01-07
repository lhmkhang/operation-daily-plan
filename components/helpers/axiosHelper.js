import axios from "axios";

// Xử lý Response Thành Công
axios.interceptors.response.use(
  (response) => {
    // Có thể thêm logic xử lý riêng cho các response thành công ở đây
    // Hiện tại, chỉ đơn giản trả về response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Xử lý lỗi liên quan đến Authentication
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu request đã được retry

      try {
        // Yêu cầu lấy lại access token bằng refresh token
        const localData = JSON.parse(localStorage.getItem("persist:root"));

        console.log(localData);

        const { refreshToken, username } = localData.auth.userInfo;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/refresh-token`,
          {
            refreshToken,
            username,
          }
        );

        const newAccessToken = response.data.newAccessToken;

        // Cập nhật access token mới vào header của request ban đầu
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry request ban đầu với access token mới
        return axios(originalRequest);
      } catch (error) {
        // Xử lý khi không thể lấy lại access token
        // Ví dụ: chuyển hướng người dùng đến trang đăng nhập
        return Promise.reject(error);
      }
    }

    // Trả về lỗi cho các trường hợp khác
    return Promise.reject(error);
  }
);

export default axios;
