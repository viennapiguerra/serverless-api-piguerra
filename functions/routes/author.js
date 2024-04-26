const express = require('express');
const AuthorModel = require('../models/author');

const router = express.Router();

// GET all authors
router.get('/', async (req, res) => {
    try {
        const authors = await AuthorModel.find();
        return res.json(authors);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// GET a single author
router.get('/:id', async (req, res) => {
    try {
        const author = await AuthorModel.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.json(author);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Create an author
router.post('/', async (req, res) => {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ message: 'Name and age are required' });
        }
        const existingAuthor = await AuthorModel.findOne({ name });
        if (existingAuthor) {
            return res.status(400).json({ message: 'Author already exists' });
        }
        const newAuthor = await AuthorModel.create({ name, age });
        return res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

// UPDATE an author
router.patch('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const author = await AuthorModel.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.json(author);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

// DELETE an author
router.delete('/:id', async (req, res) => {
    try {
        const author = await AuthorModel.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.json({ message: 'Author deleted' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
