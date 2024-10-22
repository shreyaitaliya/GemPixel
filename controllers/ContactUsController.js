const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const registerModel = require("../models/ContactUsModel")(sequelize, DataTypes);
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const AddUser = async (req, res) => {
    try {
        const { name, email, country, number, help } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shreyaitaliya11@gmail.com',
                pass: 'qarq gdwn zqyy vyez',
            },
        });

        // Email options (sender, receiver, and email body)
        const mailOptions = {
            from: email,
            to: 'shreyaitaliya11@gmail.com',
            replyTo: email,
            subject: `Contact Details`,
            text: `Help Message: ${help}\n\Name: ${name}\nEmail: ${email}\nCountry: ${country}\nPhone: ${number}`,
        };

        // Send email                    
        await transporter.sendMail(mailOptions);

        const adduser = await registerModel.create({ name, email, country, number, help })

        return res.status(200).send({
            success: true,
            message: 'Register User Successfully..',
            Data: adduser
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = ({
    AddUser,
})