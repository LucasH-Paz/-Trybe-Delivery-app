const { user } = require('../database/models');
const { newToken } = require('../auth/newJWT');

const login = async ({ email, password }) => {
  try {
    const userLogin = await user.findOne({ where: { email, password } });
    const { email: userEmail, name: userName, role: userRole, id } = userLogin;
    const token = newToken(userEmail, userName, userRole, id);

    return { userLogin, token };
  } catch (e) {
    return null;
  }
};

const createUser = async ({ name, email, password, type }) => {
  try {
    const newUser = await user.create({ name, email, password, role: type });
    const token = newToken(email, name, 'customer');
    return { token, newUser };
  } catch (e) {
    return { err: e.message };
  }
};

const findUser = async (name, email) => {
  const userFound = await user.findOne({ where: { name, email } });
  return { userFound };
};

const listUsers = async (role) => (
  role
    ? user.findAll({ where: { role } })
    : user.findAll()
);

module.exports = {
  login,
  createUser,
  findUser,
  listUsers,
};
