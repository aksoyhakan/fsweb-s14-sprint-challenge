// serverı buraya yazın ve index.js require yazın
require("dotenv").config();
const express = require("express");
const projectRoutes = require("./project/router");
const resourceRoutes = require("./resource/router");
const taskRoutes = require("./task/router");
const detailInfoRoutes = require("./detailinfo/router");

const server = express();
server.use(express.json());

server.use("/api/projects", projectRoutes);
server.use("/api/resources", resourceRoutes);
server.use("/api/tasks", taskRoutes);
server.use("/api/detailInfo", detailInfoRoutes);

module.exports = server;
