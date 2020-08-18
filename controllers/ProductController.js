const models = require("../models")
const response = require('../helpers/response')
const cloudinary = require("cloudinary")
const config = require("../config/cloudinaryConfig")
const fs = require("fs")
const path = require("path")

class Controller {
    static async create (req, res) {
        cloudinary.config(config)

        const imageData = {
            imageName: req.file.filename,
            imageUrl: req.file.path,
            imageId: ""
        }
        let imagePath = path.join(__dirname, "./../asset/images/") + imageData.imageName

        try {
            await cloudinary.uploader.upload(imageData.imageUrl)
                .then((result) => {
                    fs.unlinkSync(imagePath)
                    imageData.imageUrl = result.secure_url;
                    imageData.imageId = result.public_id;
                })
                .catch((err) => {
                    res.status(422).json(response("Fail", err))
                })
            
            const data = await models.Product.create({
                name: req.body.name,
                stock: req.body.stock,
                price: req.body.price,
                photo_url: imageData.imageUrl,
                photo_id: imageData.imageId,
                user_id: req.user_id
            })

            res.status(200).json(response("Success", "Product has been created", data))
        } catch (error) {
            res.status(400).json(response("Fail", error.message))
        }
    }

    static async show (req, res) {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const offset = page ? page * limit : 0;

            await models.Product.findAndCountAll({
                include: models.User,
                limit: limit,
                offset: offset
            }).then(data => {
                const product = {
                    data: data.rows,
                    totalItems: data.count,
                    totalPages: Math.ceil(data.count / limit),
                    currentPages: page+1
                }
                res.status(200).json(response("Success", "Data has been retrived", product))
            }).catch(error => res.json(error))

        } catch (error) {
            res.status(500).json(response("Fail", error.message))
        }
    }

    static async find (req, res) {
        try {
            const product = await models.Product.findByPk(req.params.id)
            
            if (product) {
                res.status(200).json(response("Success", "Product detail has been retrieved", product))
            }

            res.status(422).json(response("Fail", "Product doesn't exist", product))
            
        } catch (error) {
            res.status(500).json(response("Fail", error.message))
        }
    }

    static async update (req, res) {
        try {
            const product = await models.Product.findByPk(req.params.id)

            if (!product) {
                res.status(422).json(response("Fail", "Product doesn't exist", product))
            }

            await models.Product.update(req.body, {
                where: {
                    id: req.params.id,
                },
            })

            const data = {
                "New Data" : req.body,
                "Old Data" : product
            }
            
            res.status(200).json(response("Success", "User detail has been updated", data))
        } catch (error) {
            res.status(500).json(response("Fail", error.message))
        }
    }

    static async delete (req, res) {
        try {
            const product = await models.Product.findByPk(req.params.id)

            if (!product) {
                res.status(422).json(response("Fail", "Product doesn't exist", product))
            }

            await models.Product.destroy({
                where: {
                    id: req.user_id,
                }   
            })

            res.status(200).json("Success", `${user.dataValues.name} product has been deleted`)

        } catch (error) {
            res.status(500).json(response("Fail", error.message))
        }
    }

}

module.exports = Controller;