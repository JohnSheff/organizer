const express = require('express');
const router = express.Router();
const Contact = require('../models/users');
const eventCalendars = require('../models/eventCalendars');

router.route('/contacts')
    .get(async function (req, res) {
        try {
            const user = await Contact.find({})
            res.status(200).json({success: true, data: user})
        } catch (e) {
            res.status(400).json({success: false})
        }
    })
    .post(async (req, res) => {
        try {
            const {id, username, email, date, description, phone} = req.body
            if (req.body.id) {
                const userUpdate = await Contact.findByIdAndUpdate({_id: id}, {
                    username,
                    email,
                    date,
                    description,
                    phone
                })
                res.status(201).json({success: true, data: userUpdate})
            } else {
                const user = await Contact.create(req.body)
                res.status(201).json({success: true, data: user})
            }

        } catch (e) {
            res.status(400).json({success: false})

        }
    })
router.route('/calendars')
    .get(async function (req, res) {
        try {
            const eventCal = await eventCalendars.find({})
            res.status(200).json({success: true, data: eventCal})
        } catch (e) {
            res.status(400).json({success: false})
        }
    })
    .post(async (req, res) => {
        try {
            const addEvent = await eventCalendars.create(req.body)
            res.status(201).json({success: true, data: addEvent})
        } catch (e) {
            res.status(400).json({success: false})

        }
    })

module.exports = router;