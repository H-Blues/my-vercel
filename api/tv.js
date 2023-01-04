import { connectToDatabase } from "../db/index";

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const collection = await db.collection("tvs");
    const tvs = await collection.find().toArray();
    res.status(200).json({ tvs });
  } else if (req.method === "POST") {
    const newTV = req.body;
    const db = await connectToDatabase();
    const collection = await db.collection("tvs");
    await collection.insertOne(newTV);
    res.status(200).json({ msg: 'Add a TV successfully', newTV: newTV });
  } else {
    res.status(404).json({ msg: "Error route note found" });
  }
};