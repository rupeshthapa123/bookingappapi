const express = require("express");
const router = express.Router();
const {createRoom, updateRoom, 
    deleteRoom, getRoom, 
    getRooms,
    updateRoomAvailability} = require("../controllers/Room");
const { verifyAdmin } = require("../utils/verifyToken");

//CREATE
router.post("/:hotelId",verifyAdmin, createRoom);
//UPDATE
router.put("/:id",verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);
//DELETE
router.delete("/:id/:hotelId",verifyAdmin, deleteRoom);
//GET
router.get("/:id",getRoom);
//GETALL
router.get("/", getRooms);

module.exports = router;