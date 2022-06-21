const express = require("express");
const router = express.Router();
const {updateUser, deleteUser, getUser, getUsers} = require("../controllers/user")
const {verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken")

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("Hello user, You are logged in.")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("Hello user, You are logged in and you can delete your account.")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("Hello user, You are logged in and you can delete all accounts.")
// })
//UPDATE
router.put("/:id",verifyUser, updateUser);
//DELETE
router.delete("/:id",verifyUser, deleteUser);
//GET
router.get("/:id",verifyUser, getUser);
//GETALL
router.get("/",verifyAdmin, getUsers);

module.exports = router;