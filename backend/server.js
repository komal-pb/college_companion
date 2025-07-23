const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Import and use auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

const attendanceRoutes = require('./routes/attendanceRoutes');
app.use('/api', attendanceRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running...');
});
