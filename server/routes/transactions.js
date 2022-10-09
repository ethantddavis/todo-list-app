const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();

// Get all
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get 1
router.get('/:id', getTransaction, (req, res) => {
    res.json(res.transaction);
});

// Create 1
router.post('/', async (req, res) => {
    const transaction = new Transaction({
        timestamp: req.body.timestamp,
        userAddress: req.body.userAddress,
        transactionHash: req.body.transactionHash,
        transactionType: req.body.transactionType,
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update 1
router.patch('/:id', getTransaction, async (req, res) => {
    if (req.body.timestamp != null) {
        res.transaction.timestamp = req.body.timestamp; 
    }
    if (req.body.userAddress != null) {
        res.transaction.userAddress = req.body.userAddress
    }
    if (req.body.transactionHash != null) {
        res.transaction.transactionHash = req.body.transactionHash; 
    }
    if (req.body.transactionType != null) {
        res.transaction.transactionType = req.body.transactionType; 
    }
    try {
        const updatedTransaction = await res.transaction.save();
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete 1
router.delete('/:id', getTransaction, async (req, res) => {
    try {
        await res.transaction.remove();
        res.json({ message: "Deleted Transaction" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getTransaction(req, res, next) {
    let transaction;
    
    try {
        transaction = await Transaction.findById(req.params.id);
        if (transaction == null) {
            return res.status(404).json({ message: "cannot find transaction" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    res.transaction = transaction;
    next();
}

module.exports = router;