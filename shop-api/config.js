const path = require('path');
const rootPath = __dirname;
require('dotenv').config();

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: process.env.MONGODB_URL || 'mongodb+srv://mamzigran:9fAOhC9aT2zMkQaw@cluster0.xnmipzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        options: {
        },
    },
};
