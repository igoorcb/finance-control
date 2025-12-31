FROM node:24-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

EXPOSE 5173

# Vite dev server com hot reload e host habilitado
CMD ["npm", "run", "dev"]
