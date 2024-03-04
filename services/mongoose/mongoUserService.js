'use strict'

const mongoose = require('mongoose');
const userSchema = require('../../models/userSchema');
const userModel = mongoose.model('User', userSchema);

const findUserById = async (id) => {

    return await userModel.findOne({ id: id });
}

const updateUser = async (id, name, email, userType) => {
    const user = await userModel.findOne({ id: id });
    if (user) {
        user.name = name;
        user.email = email;
        user.userType = userType;
        await user.save();
    }
    return user;
}

module.exports = { findUserById, updateUser };
