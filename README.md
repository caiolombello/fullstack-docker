# Fullstack Docker
App with Frontend in one container and Backend in another conteiner, that communicate with each other.

### Frontend
- node http-server
- Port: 8080
- Created a button that goes to *localhost:3001* (Backend)

### Backend
- node express
- Port: 3001
- When *localhost:3001* (Backend) called, redirects to *localhost:8080* (Frontend)
  
### Docker
1. Created Dockerfile for each structure in each folder
2. Created docker-compose at source project

To build and create containers:
```bash
$ docker-compose build
```

To run:
```bash
$ docker-compose up -d backend && docker-compose up -d frontend
```

# How-to guide

## Making Backend
### Step 1: Update Ubuntu and install nano, curl
```bash
apt-get update && apt-get upgrade -y
```

### Step 2: Install Node.js
```bash
$ curl -fsSL https://deb.nodesource.com/setup_current.x |  sudo -E bash -
```
```bash
$ apt-get install nodejs -y
```

### Step 3: Create a directory and the needed js files
```bash
$ mkdir project project/backend && cd project/backend
```
```bash 
$ npm init
```

### Step 4: Install Express
```bash
$ npm install express --save
```

### Step 5: Create a redirect app
With your favorite editor, create a file with whatever name you want to.
```bash
vi app.js
```
And paste the following code:
```js
const express = require('express')
const app = express()
const port = 3001

// When receive a request from http://127.0.0.1:3001/ redirects to http://127.0.0.1:8080/
app.get("/", (req, res) => {
  res.status(301).redirect("http://127.0.0.1:8080/")
})

// When receive a request from http://127.0.0.1:3001/ redirects to http://127.0.0.1:8080/hello-docker
app.get("/hello-docker", (req, res) => {
  res.status(301).redirect("http://127.0.0.1:8080/hello-docker.html")
})

app.listen(port, () => {
  console.log(`Your first Express app is successfully running! You can view the output of this app at http://localhost:${port}`)
})
```
To start the apllication use:
```bash
node app.js
```

### Step 6: Create the Dockerfile
```bash
vi Dockerfile
```
And paste the following code:
```Dockerfile
# Downloads the latest image from Docker Hub 
FROM node

# Define the work directory
WORKDIR /app

# Copies the packages, where have the dependencies, to workdir
COPY package*.json /app/

# Downloads the dependencies from packages
RUN npm install

# Copies the content from directory to workdir
COPY . .

# Opens the port 3001
EXPOSE 3001

# Comand to up application
CMD [ "node", "app.js" ]
```

## Making Frontend

### Step 1: Create the frontend directory
```bash
$ cd .. && mkdir project/frontend && cd frontend
```

### Step 2: Install http-server
```bash
npm install http-server
```
### Step 3: Create the frontend
Design whatever thing and make some element calls to backend *http://ip:port/*. <br>
In this case, we gonna call to *http://127.0.0.1:3001/*. <br>
I created buttons to call it:
```html
<a class="btn btn-primary" href="http://127.0.0.1:3001/">Back</a>
<a class="btn btn-success" href="http://127.0.0.1:3001/hello-docker">Response</button>
```
Now you create another HTML with another name and do the same thing.

### Testing
To start frontend server use the following command at the frontend folder: <br>
```bash
npx http-server
```
To test, now start the backend server, at backend folder using the following command:
```bash
node app.js
```
Now, go to http://127.0.0.1:8080 and test.

### Step 4: Create the Dockerfile
```bash
vi Dockerfile
```
And paste the following code:
```Dockerfile
# Downloads the latest image from Docker Hub 
FROM node

# Define the work directory
WORKDIR /view

# Copies the packages, where have the dependencies, to workdir
COPY package*.json /view/

# Downloads the dependencies from packages
RUN npm install

# Copies the content from directory to workdir
COPY . .

# Opens the port 8080
EXPOSE 8080

# Comand to up application
CMD [ "npx", "http-server" ]
```

## Docker
### Step 1: Create docker-compose
To start the dockerizing, first, go to the source project and create the docker-compose.yml file.
```bash
vi docker-compose.yml
```
And paste the following code:
```yml
services:
  backend:
    container_name: backend-cointainer
    restart: always
    build: ./backend
    ports:
      - "3001:3001"
    networks:
      - fullstack 
  frontend:
    container_name: frontend-container
    restart: always
    build: ./frontend
    ports:
      - "8080:8080"
    networks:
      - fullstack

networks:
  fullstack:
    driver: bridge
```
### Step 2: Build the containers
```bash
docker-compose build
```

### Step 3: Up the containers
```bash
docker-compose up -d backend && docker-compose up -d frontend
```

To see if is running:
```bash
docker ps
```
Or go to following link: http://127.0.0.1:8080/