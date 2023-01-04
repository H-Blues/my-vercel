import { connectToDatabase } from "../../db/index";

module.exports = async (req, res) => {
  const { query: { id } } = req;
  const movieId = parseInt(id);
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const collection = await db.collection("movies");
    const movie = await collection.findOne({ id: movieId });
    if (movie) {
      res.status(200).json({ msg: 'Find movie successfully', movie: movie });
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } else if (req.method === "DELETE") {
    const db = await connectToDatabase();
    const collection = await db.collection("movies");
    try {
      await collection.deleteOne({ id: movieId });
      res.status(200).json({ msg: 'Delete movie successfully' });
    } catch (error) {
      res.status(400).json({ msg: `Delete failed, something wrong. ${error}` });
    }
  } else {
    res.status(404).json({ msg: "Error route note found" });
  }
};