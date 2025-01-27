const { ObjectId } = require('mongodb');
const MongoClient = require('../../db/connection');

const COLLECTION_NAME = 'contacts';

const listAllContacts = async (req, res) => {
    try {
        const result = await MongoClient.getDb()
            .collection(COLLECTION_NAME)
            .find();
        const lists = await result.toArray();
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getContactById = async (req, res) => {
    try {
        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID format' });
        }

        const result = await MongoClient.getDb()
            .collection(COLLECTION_NAME)
            .findOne({ _id: new ObjectId(contactId) });

        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error(`Error fetching contact by ID: ${err}`);
        res.status(500).json({ error: 'An error occured while fetching the contact' });
    }
}

const createContact = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const result = await MongoClient.getDb()
            .collection(COLLECTION_NAME)
            .insertOne(newContact);

        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        console.error(`Error creating contact: ${err}`);
        res.status(500).json({ error: 'An error occured while creating the contact' });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }

        const updates = req.body;

        const result = await MongoClient.getDb()
            .collection(COLLECTION_NAME)
            .updateOne(
                { _id: new ObjectId(contactId) },
                { $set: updates }
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (err) {
        console.error(`Error updating contact: ${err}`);
        res.status(500).json({ error: 'An error occured while updating the contact' });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact Id' });
        }

        const result = await MongoClient.getDb()
            .collection(COLLECTION_NAME)
            .deleteOne({ _id: new ObjectId(contactId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error(`Error deleting contact: ${err}`);
        res.status(500).json({ error: 'An error occured while deleting the contact' });
    }
};

module.exports = {
    listAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};