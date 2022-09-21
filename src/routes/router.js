const express = require("express")
const router = express.Router();
const userController= require("../controller/userController")

const bookController=require("../controller/bookController")

const bookController = require("../controller/bookController")



//=============================== CreateUser=======================================//
router.post("/register",userController.CreateUser)

//================================= LoginUser =======================================//
router.post("/login", userController.login)

//=============================== Registered a book ==================================//
router.post("/books", bookController.createBooks)
//=============================== Get list of book ==================================//
router.get("/books", bookController.getallBook)
//=============================== update book ==================================//
router.put("books/:bookId",bookController.updatebooks)


module.exports = router;

