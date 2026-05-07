/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const mongoose = require('mongoose');

async function cleanup() {
  try {
    const dbName = process.env.DB_NAME || 'acclimation-sports-management';
    const urlWithDb = process.env.DATABASE_URL.replace(
      /(\.mongodb\.net\/)[^?]*(\?|$)/,
      `$1${dbName}$2`,
    );
    await mongoose.connect(urlWithDb);
    
    console.log(`Connected to MongoDB: ${dbName}. Cleaning up junk pages...`);
    
    const PageSchema = new mongoose.Schema({}, { strict: false });
    const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
    
    const junkSlugs = [
      'asdasd', 
      'zdfsdf', 
      '1778046310501-graph.png', 
      '1778049008497-joe.png',
      'homme'
    ];
    
    for (const slug of junkSlugs) {
      const result = await Page.deleteOne({ slug });
      console.log(`Deletion result for '${slug}':`, result);
    }

    await mongoose.disconnect();
    console.log("Disconnected. Cleanup complete.");
  } catch (error) {
    console.error("Cleanup error:", error);
    process.exit(1);
  }
}

cleanup();
