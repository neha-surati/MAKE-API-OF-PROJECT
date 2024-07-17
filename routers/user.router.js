const { Router } = require("express");
const { createUser, getUser, userUpdate, deleteUser, userlogin } = require("../controllers/user.Controller");

const U_router=Router();

U_router.post('/',createUser);
U_router.post('/login',userlogin)
U_router.get('/data',getUser);
U_router.patch('/update/:id',userUpdate);
U_router.delete('/delete/:id',deleteUser);
U_router.post('/login',userlogin)

module.exports=U_router;