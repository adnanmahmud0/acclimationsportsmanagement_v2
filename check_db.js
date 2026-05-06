const mongoose = require('mongoose');
const Page = require('./src/models/page').default;

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/acclimation-sports-management');
  const page = await Page.findOne({ slug: 'home' });
  console.log(JSON.stringify(page, null, 2));
  process.exit(0);
}
run();
