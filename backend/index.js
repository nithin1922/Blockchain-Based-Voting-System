const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const votingRoutes = require('./routes/votingRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/voting', votingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
