# === BASE STAGE ===
FROM node:23.9.0-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g @angular/cli@15.2.0

COPY . .

# === CONFIG STAGE ===
FROM base AS config

RUN echo "export const environment = { \
  production: true, \
  apiUrl: '${SERVER_URL}' \
};" > src/environments/environment.ts

# === BUILD STAGE ===
FROM config AS build

RUN npm run build

# === RUNTIME STAGE ===
FROM build AS runtime

EXPOSE 4200
CMD ["npm", "run", "serve:ssr"]