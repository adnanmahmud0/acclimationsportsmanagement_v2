import connectDB from "./mongodb";
import Page from "../models/page";

async function check() {
  await connectDB();
  const page = await Page.findOne({ slug: "holistic-concierge" });
  console.log(JSON.stringify(page, null, 2));
  process.exit(0);
}

check();
