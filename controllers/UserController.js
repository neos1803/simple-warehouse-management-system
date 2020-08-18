require('dotenv').config()
const models = require("../models")
const response = require('../helpers/response')


class Controller {
    static async create (req, res) {
        try {
            const user = await models.User.findOne({
                where: {
                    username: req.body.username,
                }
            })

            if (!user) {
                const data = await models.User.create({
                    full_name: req.body.full_name,
                    username: req.body.username,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    role: req.body.role
                })
    
                res.status(201).json(response("Success", "User has been created", data))
            }

            else {
                if (user.dataValues.phone_number == req.body.phone_number || user.dataValues.email == req.body.email) {
                    return res.status(422).json("Fail", "Email or Phone Number is exist")
                }
                return res.status(422).json("Fail", "Username has been taken")
            }

        } catch (error) {
            res.status(400).json(response("Fail", error.message))
        }
    }

    static async show (req, res) {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const offset = page ? page * limit : 0;

            await models.User.findAndCountAll({
                limit: limit,
                offset: offset
            }).then(data => {
                const user = {
                    data: data.rows,
                    totalItems: data.count,
                    totalPages: Math.ceil(data.count / limit),
                    currentPages: page+1
                }
                res.status(200).json(response("Success", "Data has been retrived", user))
            }).catch(error => res.json(error))

        } catch (error) {
            res.status(500).json(response("Fail", error.message))
        }
    }

    static async find (req, res) {
        try {
            if (req.user_id != req.params.id) {
                return res.status(401).json(response("Fail", "You are not the user"))
            }
            const user = await models.User.findByPk(req.user_id)

            res.status(200).json(response("Success", "User detail has been retrieved", user))
            
        } catch (error) {
            res.status(500).json(response("Fail", error.message))
        }
    }

    static async update (req, res) {
        try {
            if (req.user_id != req.params.id){
                return res.status(401).json(response("Fail", "You are not the user"))
            }

            const user = await models.User.findByPk(req.user_id)
            await models.User.update(req.body, {
                where: {
                    id: req.user_id,
                },
            })

            const data = {
                "New Data" : req.body,
                "Old Data" : user
            }
            
            res.status(200).json(response("Success", "User detail has been retrieved", data))
        } catch (error) {
            res.status(500).json(response("Fail", error.message))
        }
    }

    static async delete (req, res) {
        try {
            if (req.user_id != req.params.id){
                return res.status(401).json(response("Fail", "You are not the user"))
            }

            const user = await models.User.findByPk(req.user_id)
            await models.User.destroy({
                where: {
                    id: req.user_id,
                }   
            })

            res.status(200).json("Success", `${user.dataValues.username} has been deleted`)

        } catch (error) {
            res.status(500).json(response("Fail", error.message))
        }
    }
}

module.exports = Controller