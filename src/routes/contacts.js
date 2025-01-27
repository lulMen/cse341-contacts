const express = require('express');
const {
    listAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contacts');

const Router = express.Router();

Router
    .get('/', listAllContacts)
    .get('/:id', getContactById)
    .put('/:id', updateContact)
    .delete('/:id', deleteContact)
    .post('/', createContact);

module.exports = Router;