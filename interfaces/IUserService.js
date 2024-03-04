'use strict'

/***
 * contract for userService - not implemented
 */
class IUserService {
    async findUserById(id) { throw new Error("Not implemented"); }
    async updateUser(id, name, email, usertype) { throw new Error("Not implemented"); }
}

module.exports = IUserService;