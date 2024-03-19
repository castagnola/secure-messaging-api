'use strict';
const express = require('express');
const userRoutes = require('./routes/user.routes');
const messagesRoutes = require('./routes/messages.routes');
const { initVault } = require('./utils/messages.utils');

const app = express();
initVault();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use('/users', userRoutes);
app.use('/messages', messagesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

