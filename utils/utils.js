import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const jsonDirPath = path.join(__dirname, "../db");
console.log(__dirname);

export const dataPath = `${jsonDirPath}/users.json`;

export const loadUsers = () => {
  const dataJSON = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(dataJSON);
};

export const findUser = (id) => {
  const users = loadUsers();
  let user = users.find((user) => user.id === id);
  console.log(user, 2);
  return user;
};

export const createUser = ({ cash, credit, id, firstName, lastName }) => {
  const users = loadUsers();
  function isDuplicated(id, users) {
    return Boolean(users.find((user) => user.id === id));
  }
  if (isDuplicated(id, users)) {
    return false;
  }
  //if user has cash and credit over 0
  if (cash + credit >= 0) {
    const user = { id, cash, credit, firstName, lastName };
    users.push(user);
    saveUserData(users);
    return user;
  }
}
export const saveUserData = (data) => {
  try {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
  } catch (error) {
    return [];
  }
};

export const func = (amount, id) => {
  const user = findUser(id);
  user.credit = amount;
  console.log(amount, 3);
};
