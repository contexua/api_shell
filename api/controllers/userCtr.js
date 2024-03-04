'use strict';

let initialised = false;

const { userCRUD } = require('./userCRUD');
const userFacade = require("../../facades/userFacade");
const FacadeBuilder = require("../../util/FacadeBuilder");

const get_user = userCRUD(userFacade.get_user);
const list_users = userCRUD(userFacade.list_users);
const delete_user = userCRUD(userFacade.delete_user);
const put_update_user = userCRUD(userFacade.put_update_user);
const post_user = userCRUD(userFacade.post_user);
const post_find_users = userCRUD(userFacade.post_find_users);

/************************************************************************************
 * 
 * node initialises on the first reference to a require.
 * any module level variables need to be set only once.
 * a bit like a singleton, but not.
 * 
 ***********************************************************************************/
const init_module = (app) => {
    if (!initialised) {

        console.log('userCtr initialising : ');
        initialised = true;
        userFacade.init_module (app);

    } else {
        
        console.log('userCtr already intialised : ');
    }
}
/************************************************************************************/
module.exports = {
  init_module,
  get_user,
  put_update_user,
  list_users,
  post_user,
  delete_user,
  post_find_users
};
/************************************************************************************/