const bookModel = require("../models/bookmodel");
const userModel = require("../models/usermodel")
const moment = require("moment")
const { isValidRequestBody, isValid, isValidRegex1, isValidRegex2, isValidObjectId } = require("../validator/validator")


const createBooks = async function (req, res) {

    try {

        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" })

        // destructuring parameter of request body 

        const { title, excerpt, userId, ISBN, category, subcategory, reviews } = requestBody


        //----------------------------- Start Validation ----------------------------------------------

        if (!isValid(title)) return res.status(400).send({ status: false, msg: "title is required and it's must be string" })
        if (!isValidRegex1(title)) return res.status(400).send({ status: false, msg: "Invalid title" })

        if (!isValid(excerpt)) return res.status(400).send({ status: false, msg: "excerpt is required and it's must be string" })
        if (!isValidRegex1(excerpt)) return res.status(400).send({ status: false, msg: "Invalid excerpt" })

        if (!isValid(userId)) return res.status(400).send({ status: false, msg: "userId is required and it's must be string" })
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })

        if (!isValid(ISBN)) return res.status(400).send({ status: false, msg: "ISBN number is required and it's must be string" })
        if (!isValidRegex2(ISBN)) return res.status(400).send({ status: false, msg: "Invalid ISBN number" })

        if (!isValid(category)) return res.status(400).send({ status: false, msg: "category is required and it's must be string" })
        if (!isValidRegex1(category)) return res.status(400).send({ status: false, msg: "Invalid category" })

        if (!Array.isArray(subcategory)) return res.status(400).send({ status: false, msg: "subcategory is required and it's must be Array" })
        for (let element of subcategory) {
            if (!isValidRegex1(element)) return res.status(400).send({ status: false, msg: `invalid subcategory value ${element}` })
        }

        if (reviews) {
            if (typeof reviews !== "number") return res.status(400).send({ status: false, msg: "reviews in Nuber type" })
            if (!/^[0-9]$/.test(reviews)) return res.status(400).send({ status: false, msg: "Invalid review Number" })
        }

        const isUniqueTitle = await bookModel.findOne({ title: title })
        if (isUniqueTitle) return res.status(409).send({ status: false, msg: "Title is already Exist" })

        const isIdreferUserModel = await userModel.findById(userId)
        if (!isIdreferUserModel) return res.status(400).send({ status: false, msg: "userId is not from user Collection" })

        const isUniqueISBN = await bookModel.findOne({ ISBN: ISBN })
        if (isUniqueISBN) return res.status(409).send({ status: false, msg: "ISBN number is already exist" })

        const data = { title, excerpt, userId, ISBN, category, subcategory, releasedAt: new Date() , reviews } // check when i not send released at then what happen
        
        const saveData = await bookModel.create(data)

        return res.status(201).send({ status: true, msg: "Book detail is successfully registered", data: saveData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


const deletebyId = async function (req, res) {
    
    try {

        let userId = req.param.bookId
        if (!isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "This is invalid bookId" }) }

        let bookId = await bookModel.findOne({ _id: userId, isDeleted: false })
        if (!bookId) {
            return res.status(404).send({ status: false, msg: "This bookId does not exit" })
        }

        let getbookDoc = await bookModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true })
        return res.status(200).send({ status: true, message: "Successfully Document Deleted", data: getbookDoc })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

module.exports = { createBooks, deletebyId }

