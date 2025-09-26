const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin user already exists:', adminExists.email);
            process.exit(0);
        }

        const adminData = {
            name: 'System Administrator',
            email: 'admin@booksan.com',
            password: 'admin123',
            role: 'admin'
        };

        const admin = await User.create(adminData);
        console.log('Admin user created successfully:');
        console.log('Email:', admin.email);
        console.log('Password: admin123');
        console.log('Role:', admin.role);
        console.log('\n⚠️  Please change the default password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error.message);
        process.exit(1);
    }
};

createAdmin();