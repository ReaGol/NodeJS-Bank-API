import express from "express";
import { router } from "./routes/router.js";
import { loadUsers } from "./utils/utils.js";



const PORT = 8000;
const HOST = "localhost";

const app = express();
app.use(express.json());

app.use("/api", router);
console.log(loadUsers())

app.listen(8000, () => {
  console.log("listening on port 8000");
});
