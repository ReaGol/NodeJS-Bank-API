import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import {
  dataPath,
  findUser,
  loadUsers,
  createUser,
  saveUserData,
  func,
} from "../utils/utils.js";

//get all users
export const getAllUsers = (req, res) => {
  try {
    const users = loadUsers();
    // console.log(users);
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
    saveUserData(users);

    return res.status(200).send(newUser);
  }
};

//get one user
export const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const users = loadUsers();
    let user = users.find((user) => user.id === id);

    // console.log(id, 4);

    return res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error: true, msg: "User missing" });
  }
};

//update user credit

export const updateCredit = (req, res) => {
  const { id } = req.params;
  const { credit } = req.body;
  const updatedData = func(credit, id);
  const users = loadUsers();
  const user = findUser(id);
  console.log(credit, 1);
  if (user && credit >= 0) {
    user.credit = credit;
    res.status(200).send(` ${user.id} have ${credit} credit `);
    saveUserData(...user);
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
  const { amount } = req.body.amount;
  const users = loadUsers();
  const user = findUser(id);
  if (user && amount >= 0) {
    user.cash += amount;
    users.push(user.cash);
    console.log(user.cash, 4);
    saveUserData(users);
    return res.status(200).send("Money deposited");
  } else {
    return res.status(400).send("Could not deposit");
  }
};
// withdrawMoney
export const withdrawMoney = (id, amount) => {
  if (!id) throw { msg: "Please pass an ID", code: 400 };
  if (!amount) throw { msg: "Please pass an amount to deposit", code: 400 };
  amount = Number(amount);
  if (Number.isNaN(amount) || amount <= 0)
    throw { msg: "Amount should be a positive number", code: 400 };
  try {
    const users = loadUsers();
    const user = users.find((user) => user.id === id);
    if (!user) throw { message: "No such user was found", code: 404 };

    const cashAfterWithdraw = user.cash - amount;
    if (cashAfterWithdraw < user.credit)
      throw { message: "Not enough cash in the account", code: 400 };
  } catch (error) {
    res.status(400).send("Cannot withdraw");
  }
  try {
    saveUserData(users);
    return user;
  } catch (error) {
    throw { message: error.message, code: 204 };
  }
};

// transferMoney
export const transferMoney = (to, from, amount) => {
  if (!to || !from)
    throw { msg: "Please pass an ID for each account", code: 400 };
  if (!amount) throw { msg: "Please pass an amount to transfer", code: 400 };
  amount = Number(amount);
  if (Number.isNaN(amount) || amount <= 0)
    throw { msg: "Amount should be a positive number", code: 400 };
  try {
    const giver = users.find((user) => user.id === from);
    const receiver = users.find((user) => user.id === to);
    if (!receiver || !giver)
      throw { message: "One of the passport ID's is invalid", code: 404 };

    const cashAfterTransfer = giver.cash - amount;
    if (cashAfterTransfer < -giver.credit)
      throw {
        message: "There is not enough cash in the giving account",
        code: 400,
      };
    giver.cash = cashAfterTransfer;
    receiver.cash += amount;

    try {
      saveUserData(users);
      return { giver, receiver };
    } catch (error) {
      throw { message: error.message, code: 204 };
    }
  } catch (error) {}
};
