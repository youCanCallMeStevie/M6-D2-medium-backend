const express = require("express");
const dotenv = require("dotenv");
const listEndpoints = require("express-list-endpoints");
const articlesRoute = require("./src/routes/articleRoute");
const authorsRoute = require("./src/routes/authorRoute");


const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./src/errorHandlers");
const mongoose = require("mongoose");
const cors = require("cors");

//INITIAL SETUP
const server = express();
dotenv.config();
const port = process.env.PORT;

//MIDDLEWARES
server.use(cors());
server.use(express.json());

//ROUTES
server.use("/articles", articlesRoute);
server.use("/authors", authorsRoute);


//ERROR HANDLERS
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.log(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      if (server.get("env") === "production")
        console.log("Server is running on CLOUD on PORT:", port);
      console.log("Server is running LOCALLY on PORT:", port);
    })
  )
  .catch(err => console.log(err));
