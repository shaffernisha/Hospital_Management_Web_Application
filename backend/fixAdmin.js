const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healnow';

async function fixAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' Connected to MongoDB');

    const collection = mongoose.connection.collection('users');

    // Check what's currently in DB
    const existing = await collection.findOne({ email: 'admin@healnow.com' });
    
    if (existing) {
      console.log('\n Found existing admin:');
      console.log('   _id:', existing._id);
      console.log('   email:', existing.email);
      console.log('   role:', existing.role);
      console.log('   password hash:', existing.password);

      // Test if Admin password matches the stored hash
      const testMatch = await bcrypt.compare('Admin@123', existing.password);
      console.log('\n Does "Admin@123" match stored hash?', testMatch ? ' YES' : ' NO');

      if (!testMatch) {
        console.log('\n🔧 Hash is wrong — deleting and recreating...');
        await collection.deleteOne({ email: 'admin@healnow.com' });
      } else {
        console.log('\n Password hash is correct! The issue may be elsewhere.');
        await mongoose.disconnect();
        return;
      }
    } else {
      console.log('\n  No admin found in DB — creating fresh...');
    }

    // Create fresh admin with correct single hash
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    // Verify the hash before inserting
    const verifyBeforeInsert = await bcrypt.compare('Admin@123', hashedPassword);
    console.log(' Pre-insert hash verify:', verifyBeforeInsert ? ' GOOD' : ' BAD');

    const result = await collection.insertOne({
      firstName: 'Admin',
      lastName: 'HealNow',
      email: 'admin@healnow.com',
      password: hashedPassword,
      phone: '9999999999',
      role: 'admin',
      profileComplete: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('\n Admin inserted! ID:', result.insertedId);

    // Final verify — read back from DB and test
    const newAdmin = await collection.findOne({ email: 'admin@healnow.com' });
    const finalCheck = await bcrypt.compare('Admin@123', newAdmin.password);
    console.log(' Post-insert verify from DB:', finalCheck ? ' PASSWORD WILL WORK' : ' STILL BROKEN');

    console.log('\n Login credentials:');
    console.log('   Email:    admin@healnow.com');
    console.log('   Password: Admin@123');

  } catch (error) {
    console.error(' Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected.');
  }
}

fixAdmin();