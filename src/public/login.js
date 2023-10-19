// login.js

function submitLoginForm(e) {
  e.preventDefault();
  const username = document.querySelector("#exampleInputEmail1").value;
  const password = document.querySelector("#exampleInputPassword1").value;

  axios
    .post("http://localhost:8080/api/v1/signin", {
      username: username,
      password: password,
    })
    .then((response) => {
      // Lưu token vào localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // Chuyển hướng người dùng hoặc thực hiện hành động khác sau khi đăng nhập thành công
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      // Xử lý lỗi đăng nhập tại đây (ví dụ: hiển thị thông báo lỗi)
    });
}

function submitLogoutForm(e) {
  e.preventDefault();
  const username = document.querySelector("#email").value;
  const password = document.querySelector("#newPass").value;
  const token = localStorage.getItem("accessToken");

  console.log(username);
  console.log(password);
  console.log("token:", token);

  axios
    .post(
      "http://localhost:8080/api/v1/change-password",
      {
        username: username,
        password: password,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      // Lưu token vào localStorage
      // localStorage.setItem("accessToken", response.data.accessToken);
      // localStorage.setItem("refreshToken", response.data.refreshToken);
      // Chuyển hướng người dùng hoặc thực hiện hành động khác sau khi đăng nhập thành công
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      // Xử lý lỗi đăng nhập tại đây (ví dụ: hiển thị thông báo lỗi)
    });
}
