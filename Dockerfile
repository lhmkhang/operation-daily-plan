# Bước 1: Xây dựng ứng dụng trong môi trường Node.js
FROM node:18.19.0-alpine as builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép mã nguồn của ứng dụng
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Bước 2: Chạy ứng dụng sử dụng máy chủ Node.js
FROM node:18.19.0-alpine

WORKDIR /app

# Sao chép các phụ thuộc đã cài đặt và các file xây dựng từ bước trước
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/redux ./redux

ENV NEXT_PUBLIC_API_BASE_URL=https://ops-int-be-uat.digi-texx.vn
ENV NEXT_PUBLIC_ALLOW_CORS_SOCKET=https://ops-int-be-uat.digi-texx.vn

# Chạy máy chủ Next.js
CMD ["npm", "start"]