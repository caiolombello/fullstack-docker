# Baixa uma imagem node mais recente do Docker Hub
FROM node

# Define a pasta de trabalho
WORKDIR /app

# Copia os packages, onde contém as dependências, para a pasta de trabalho
COPY package*.json /app/

# Baixa as dependências contidas nos packages
RUN npm install

# Copia o conteúdo da pasta para a pasta de trabalho
COPY . .

# Abre a porta 3001
EXPOSE 3001

# Comando para subir aplicação
CMD [ "node", "app.js" ]
