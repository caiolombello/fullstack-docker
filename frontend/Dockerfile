# Baixa uma imagem nginx mais recente do Docker Hub
FROM node

# Define a pasta de trabalho
WORKDIR /view

# Copia os packages, onde contém as dependências, para a pasta de trabalho
COPY package*.json /view/

# Baixa as dependências contidas nos packages
RUN npm install

# Copia o conteúdo da pasta para a pasta de trabalho
COPY . .

# Abre a porta 8080
EXPOSE 8080

# Comando para subir aplicação
CMD [ "npx", "http-server" ]