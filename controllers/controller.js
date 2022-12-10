import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { dataPath, findUser, loadUsers, createUser } from "../utils/utils.js";

//get all users
export const getAllUsers = (req, res) => {
  try {
    const users = loadUsers();
    console.log(users);
    return res.status(200).send(users);
  } catch (error) {
    res.status(400).send("error");
  }
};

//add user
export const addNewUser = (req, res) => {
  const users = loadUsers();
  const userData = req.body;
  // const userID = uuidv4();
  const newUser = createUser(userData);
  if (!newUser) {
    return res.status(400).send("Already exist");
  } else {
    users.push(newUser);
    fs.writeFileSync(dataPath, JSON.stringify(users));

    return res.status(200).send(newUser);
  }
};

//get one user
export const getUserById = (req, res) => {
  try {
    const id = Number(req.params.userId);
    res.send({ success: true, msg: "Showing user details" });
  } catch (error) {
    res.status(404).send({ error: true, msg: "User missing" });
  }
};

//update user credit

export const updateCredit = (req, res) => {
  const { id } = req.params;
  const credit = req.body.credit;
  const updatedData = func(credit.amount, id);
  const users = loadUsers();
  const user = findUser();
  if (user && credit >= 0) {
    user.credit = credit;
    res.status(200).send(` ${user.id} have ${credit} credit `);
  } else {
    return res
      .status(409)
      .send({ error: true, msg: "No such user or credit insufficient" });
  }

  res.send({ success: true, msg: "User credit updated" });
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
