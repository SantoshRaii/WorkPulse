# # FROM node:22

# # WORKDIR /app

# # COPY package*.json ./
# # RUN npm install

# # COPY . .

# # EXPOSE 5173

# # CMD ["npm", "run", "dev"]

# # Build stage
# FROM node:22 AS builder
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Serve stage
# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# ---------- BUILD STAGE ----------
FROM node:22 AS builder
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- SERVE STAGE ----------
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
