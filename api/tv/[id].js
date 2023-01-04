import { connectToDatabase } from "../../db/index";

module.exports = async (req, res) => {
  const { query: { id } } = req;
  const tvId = parseInt(id);
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const collection = await db.collection("tvs");
    const tv = await collection.findOne({ id: tvId });
    if (tv) {
      res.status(200).json({ msg: 'Find TV successfully', tv: tv });
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } else if (req.method === "DELETE") {
    const db = await connectToDatabase();
    const collection = await db.collection("tvs");
    await collection.deleteOne({ id: tvId });
    res.status(200).json({ msg: 'Delete TV successfully' });
  }
};