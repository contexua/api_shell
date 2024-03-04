'use strict'

let users = require('../../mocks/users.json');

const listAllUsers = () => {
    return users;
}

const searchUsers = (query) => {
    return users.filter(user => {

        return Object.keys(query).every(key => user[key] === query[key]);
    });
}

const findUserById = (id) =>  {
    return users.find(u => u.id === id);
}

const createUser = (name, email, userType) => {
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
        name,
        email,
        userType,
    };
    users.push(newUser);
    return newUser;
}

const updateUser = (id, name, email, usertype) => {
    const user = users.find(u => u.id === id);
    if (user) {
        user.name = name;
        user.email = email;
        user.userType = usertype;
    }
    return user;
}

const deleteUser = (id) => {
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    return initialLength !== users.length;
}

module.exports = {findUserById, updateUser, listAllUsers, createUser, deleteUser, searchUsers};
