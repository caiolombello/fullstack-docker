const express = require('express')
const app = express()
const path = require('path');
const port = 3001

// Ao receber requisição em http://127.0.0.1:3001/ -> http://127.0.0.1:8080/
app.get("/", (req, res) => {
  res.status(301).redirect("http://127.0.0.1:8080/")
})

// Ao receber requisição em http://127.0.0.1:3001/ -> http://127.0.0.1:8080/hello-docker
app.get("/hello-docker", (req, res) => {
  res.status(301).redirect("http://127.0.0.1:8080/hello-docker.html")
})

app.listen(port, () => {
  console.log(`Your first Express app is successfully running! You can view the output of this app at http://localhost:${port}`)
})
