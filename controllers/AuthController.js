require('dotenv').config()
const models = require("../models")
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.SECRET

class Controller {
    static async login (req, res) {
        try {
            const user = await models.User.findOne({
                where: {
                    username: req.body.username
                }
            })

            if (!user) {
                return res.status(422).json(response("Fail", "Username not found"))
            }
            const token = jwt.sign(user.id, jwtSecret)
            
            res.status(200).json(response("Success", "Login Success", { token }))
        } catch (error) {
            res.status(500).json(response("Fail", error.message))
        }
    }
}

module.exports = Controller