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
> docker-compose build 

To run:
> docker-compose up -d backend && docker-compose up -d frontend