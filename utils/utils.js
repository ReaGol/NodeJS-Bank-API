import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"


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
    return users.find((user) => user.id === id) 
}



export const saveUserData = (data) => {
    try {
          const stringifyData = JSON.stringify(data);
          fs.writeFileSync(dataPath, stringifyData);
    } catch (error) {
        return []
    }

};

export const func = (amount, id) => {
    const user = findUser()
    user.credit = amount;

}