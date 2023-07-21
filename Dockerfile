# Sử dụng image cơ sở có Node.js 16.17.0
FROM node:16.17.0

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các tệp package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép tất cả các mã nguồn vào container
COPY . .

# Thiết lập các biến môi trường
ENV PORT=8000
ENV NODE_ENV=development
ENV DB_CONNECTION_STRING="mongodb://10.1.23.167:27017/"
ENV SECRET_KEY="LeHoangMinhKhang"
ENV SESSION_LIFE_TIME=10800000
ENV EXPIRE_TOKEN_IN=1h

# Mở cổng 8080 để lắng nghe các kết nối
EXPOSE 8080

# Khởi chạy ứng dụng
CMD [ "node", "src/server.js" ]
