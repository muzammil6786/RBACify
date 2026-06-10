const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const dbConnection = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, async() => {
    try {
    await dbConnection;
    console.log('Connected to DB');
    console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
});