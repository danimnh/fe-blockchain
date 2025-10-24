# Use Alpine base with Node
FROM node:16.20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install deps
RUN npm ci --legacy-peer-deps

# Build React app
COPY . .
RUN npm run build --legacy-peer-deps

RUN cp -r public build/

# Install pm2 globally
RUN npm install -g pm2

# Expose app port
EXPOSE 3000

# Use pm2-runtime to run serve via npx (works with ESM)
CMD ["pm2-runtime", "--", "npx", "serve", "-s", "build", "-l", "3000"]
