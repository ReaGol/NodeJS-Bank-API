import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { dataPath, findUser, loadUsers } from "../utils/utils.js";

//get all users
export const getAllUsers = (req, res) => {
  try {
    const users = loadUsers();
    console.log(users)
   return res.status(200).send(users);
  } catch (error) {
    res.status(400).send("error");
  }
};

//add user
export const addNewUser = (req, res) => {
  const users = loadUsers();
  const userData = { ...req.body };
  const newUser = {
    id: uuidv4(),
    credit: 0,
    cash: 0,
  };

  if (userData.id == null) {
    return res.status(404).send({ error: true, msg: "User ID missing" });
  }
  if (findUser) {
    return res.status(409).send({ error: true, msg: "User already exists" });
  }
  users.push(newUser);
  fs.writeFileSync(dataPath, JSON.stringify(users));
  res.send(users);
};

//get one user
export const getUserById = (req, res) => {
  const id = Number(req.params.userId);
  res.send({ success: true, msg: "Showing user details" });
};

export const updateCredit = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedData = func(data.amount, id);
  const users = loadUsers();
  if (!findUser) {
    return res.status(409).send({ error: true, msg: "No such user" });
  }

  res.send({ success: true, msg: "User details updated" });
};

// depositMoney

export const depositMoney = (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const user = findUser(id);
  if (user && amount >= 0) {
    user.cash += amount;
  }
};
// withdrawMoney
// transferMoney
