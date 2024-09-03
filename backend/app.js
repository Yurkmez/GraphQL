//  !!! __dirname is not defined in ES module scope
// import path from 'path'; // so
// import { fileURLToPath } from 'url';

// Совместимость CommonJS and ES6
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// About path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// __________________

const path = require('path');
const express = require('express');
const cors = require('cors');

const userRotes = require('./routes/userRoutes.js');
const sequelize = require('./configDB/db.js');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/', userRotes);
const PORT = process.env.PORT || 5000;

async function start() {
    try {
        // await sequelize.sync();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();
