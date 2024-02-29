'use strict';
const express = require('express');
const userRoutes = require('./routes/user.route');
const messagesRoutes = require('./routes/messages.route');
const { initVault } = require('./utils/messages.utils');
const { testConnection } = require('./config/test-connection');

const app = express();
initVault();
testConnection();// Agregar la coneccion 
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use('/users', userRoutes);
app.use('/messages', messagesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`worker PID: ${process.pid}`);
});
