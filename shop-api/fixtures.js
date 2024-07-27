const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const config = require('./config');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const run = async () => {
    await mongoose.connect(config.mongo.db);
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [cpuCategory, hddCategory] = await Category.create({
        title: 'CPUs',
        description: 'Central Processor Units',
    },
        {
        title: 'HDDs',
        description: 'Hard Disk Drives',
    });

    await Product.create({
        title: "Intel core i7",
        price: 300,
        category: cpuCategory._id,
        image: 'fixtures/cpu.jpg',
    }, {
        title: "Seagate BarraCuda 1TB",
        price: 150,
        category: hddCategory._id,
        image: 'fixtures/hdd.jpg',
    }, {
        title: "AMD Ryzen 5 3600",
        price: 200,
        category: cpuCategory._id,
        image: 'fixtures/intel.jpeg',
    }, {
        title: "Western Digital 2TB",
        price: 180,
        category: hddCategory._id,
        image: 'fixtures/ncn.jpeg',
    });

    await User.create({
        email: 'admin@gmail.com',
        password: 'admin',
        token: nanoid(),
        role: 'admin',

        displayName: 'Admin'

    }, {
        email: 'user@gmail.com',
        password: 'user',
        token: nanoid(),
        role: 'user',
        displayName: 'User'

    });

    await mongoose.connection.close();
};

run().catch(console.error);
