import express from "express";
import fs from "fs";
import http from "http";
import { dataPath, getUsers, createUser } from "./utils.js";

const PORT = "8000";
const HOST = "localhost";
const app = express();
app.use(express.json());
const server = http.createServer((req, res) => {});

app.get("/api/users", (req, res) => {
  const users = getAllUsers();
  res.send(users);
});



app.listen(8000, () => {
  console.log("listening on port 8000");
});
