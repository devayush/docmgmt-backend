# Node.js LTS version
FROM node:18

# Install required dependencies
RUN apt-get update && apt-get install -y \
    openssl \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY tsconfig.json ./


# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

RUN npm install

# Copy the rest of the app
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3300

# Final CMD to run migration and start the app
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm run start"]
