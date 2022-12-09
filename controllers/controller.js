

export const getAllUsers = (req, res) => {
    res.send({ success: true, msg: "Showing all users" });
}

export const addNewUser = (req, res) => {
    res.send({ success: true, msg: "New User Added" });
}

export const getUserById = (req, res) => {
  res.send({ success: true, msg: "Showing user details" });
};

export const editUserDetails = (req, res) => {
  res.send({ success: true, msg: "User details updated" });
};

// depositMoney
// withdrawMoney
// transferMoney
// updateCredit