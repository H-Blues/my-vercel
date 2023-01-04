import { connectToDatabase } from "../../db/index";

module.exports = async (req, res) => {
  const { query: { id } } = req;
  const peopleId = parseInt(id);
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const collection = await db.collection("peoples");
    const people = await collection.findOne({ id: peopleId });
    if (people) {
      res.status(200).json({ msg: 'Find people successfully', people: people });
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } else if (req.method === "DELETE") {
    const db = await connectToDatabase();
    const collection = await db.collection("peoples");
    await collection.deleteOne({ id: peopleId });
    res.status(200).json({ msg: 'Delete people successfully' });
  }
};