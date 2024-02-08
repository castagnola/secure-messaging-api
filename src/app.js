'use strict';
const express = require('express');
const userRoutes = require('./routes/user.routes');
const currierRoutes = require('./routes/currier.routes');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use('/users', userRoutes);
app.use('/curriers', currierRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
