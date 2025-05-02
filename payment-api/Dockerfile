# Usa uma imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Instala pacotes necessários
RUN apk add --no-cache dumb-init bash

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies para build)
RUN npm ci

# Copia todo o código fonte
COPY . .

# Mostra conteúdo do diretório para debug
RUN ls -la

# Compila o TypeScript
RUN npm run build

# Mostra conteúdo do diretório dist
RUN ls -la dist

# Usa dumb-init como entrypoint
ENTRYPOINT ["dumb-init", "--"]

# Expõe a porta
EXPOSE 3000

# Comando para iniciar 
CMD ["npm", "start"]