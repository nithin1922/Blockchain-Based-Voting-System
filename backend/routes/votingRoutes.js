const express = require('express');
const router = express.Router();
const contract = require('../blockchain/contract');
const { OWNER_ADDRESS } = require('../config');

// ✅ Get list of candidates
router.get('/candidates', async (req, res) => {
    try {
        const count = await contract.methods.getCandidateCount().call();
        let candidates = [];
        for (let i = 0; i < count; i++) {
            const candidate = await contract.methods.getCandidate(i).call();
            candidates.push({ id: i, name: candidate.name, votes: candidate.voteCount });
        }
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ error: "Error fetching candidates" });
    }
});

// ✅ Add a new candidate (Admin only)
router.post('/addCandidate', async (req, res) => {
    const { name } = req.body;
    try {
        const accounts = await contract.methods.addCandidate(name).send({ from: OWNER_ADDRESS });
        res.json({ message: "Candidate added successfully", transaction: accounts });
    } catch (error) {
        res.status(500).json({ error: "Error adding candidate" });
    }
});

// ✅ Cast a vote
router.post('/vote', async (req, res) => {
    const { candidateId, voterAddress } = req.body;
    try {
        await contract.methods.vote(candidateId).send({ from: voterAddress });
        res.json({ message: "Vote cast successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error while voting" });
    }
});

module.exports = router;
