FROM node:24-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

EXPOSE 3001

# Hot reload em desenvolvimento com tsx
CMD ["npm", "run", "dev"]
