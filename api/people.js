import { connectToDatabase } from "../db/index";

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const collection = await db.collection("peoples");
    const people = await collection.find().toArray();
    res.status(200).json({ people });
  } else if (req.method === "POST") {
    const newPeople = req.body;
    const db = await connectToDatabase();
    const collection = await db.collection("peoples");
    await collection.insertOne(newPeople);
    res.status(200).json({ msg: 'Add a person successfully', newPerson: newPeople });
  } else {
    res.status(404).json({ msg: "Error route note found" });
  }
};