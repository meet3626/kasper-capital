const bcrypt=require('bcryptjs'); 
const { MongoClient } = require('mongodb'); 
async function run() { 
  const client = new MongoClient('mongodb+srv://meetgelani7_db_user:Kx5bRPAiMOlLIR08@cluster0.tdaaeo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'); 
  await client.connect(); 
  const db = client.db('brokercoresolution'); 
  const admin = await db.collection('admins').findOne({email:'admin@gmail.com'}); 
  if(admin && !admin.password.startsWith('$2a$')) { 
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash('Admin123', salt); 
    await db.collection('admins').updateOne({_id: admin._id}, {$set: {password: hash}}); 
    console.log('Updated Master Admin to bcrypt'); 
  } else { 
    console.log('Already bcrypt or missing'); 
  } 
  await client.close(); 
} 
run().catch(console.error);
