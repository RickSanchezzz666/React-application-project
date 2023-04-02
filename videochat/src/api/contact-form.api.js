const { Router } = require('express');
const { Clients } = require('../models/clients');

const router = Router();

router.post("/api/contact-form", async (req, res) => {
    const { contact_information: { name, surname, email, phone }, location: { address, city, country, zipcode }, patient_info: { birthday, overall, blood_type} } = req.body;

    const client = new Clients({
        contact_information: { name, surname, email, phone }, location: { address, city, country, zipcode }, patient_info: { birthday, overall, blood_type}
    });

    try {
        await client.save();
        return res.status(200).send('SUCCCCCCCCCCCEEEESSSSSSSSSSSSSSSSS!!!!!!!!!');
    } catch (err) {
        console.error(err.toString());
        res.status(400).send('Oy shit, something went wrong');
    }
});

module.exports = { router };