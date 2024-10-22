const { DataTypes } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const urlModel = require("../models/urlModel")(sequelize, DataTypes);
const QRCode = require('qrcode')

function generateShortURL() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
    for (let i = 0; i < 6; i++) {
        shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortUrl;
}

const AddShortURL = async (req, res) => {
    try {
        const { longurl } = req.body;

        // Check if the long URL already exists
        const existingUrl = await urlModel.findOne({ where: { longurl } });
        // if (existingUrl) {
        //     return res.status(400).send({
        //         // existingUrl
        //         success: false,
        //         message: 'URL Not Found...'
        //     })
        // }

        // Generate a short URL
        let shorturl;
        let urlExists;
        do {
            shorturl = generateShortURL();
            urlExists = await urlModel.findOne({ where: { shorturl } });
        } while (urlExists);

        // Store in the database
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const qrCodeDataUrl = await QRCode.toDataURL(`${baseUrl}/${shorturl}`); // Use shorturl here
        const url = await urlModel.create({ longurl, shorturl, qrcode: qrCodeDataUrl });



        return res.status(200).send({
            success: true,
            message: 'URL Long To Short Created Successfully...',
            Data: {
                urlID: url.urlID,
                longurl: url.longurl,
                shorturl: `${baseUrl}/${url.shorturl}`,
                qrCode: qrCodeDataUrl
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

const GetURL = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the URL by ID
        const urlData = await urlModel.findOne({ where: { urlID: id } });

        // Check if the URL exists
        if (!urlData) {
            return res.status(404).send({
                success: false,
                message: 'URL not found'
            });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const qrCodeDataUrl = await QRCode.toDataURL(`${baseUrl}/${urlData.shorturl}`);

        return res.status(200).send({
            success: true,
            message: 'URL retrieved successfully',
            Data: {
                longurl: urlData.longurl,
                shorturl: `${baseUrl}/${urlData.shorturl}`,
                qrCode: qrCodeDataUrl
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = ({ AddShortURL, GetURL })



