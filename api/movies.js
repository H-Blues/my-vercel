import { connectToDatabase } from "../db/index";

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const collection = await db.collection("movies");
    const movies = await collection.find().toArray();
    res.status(200).json({ movies });
  } else if (req.method === "POST") {
    const newMovie = req.body;
    const db = await connectToDatabase();
    const collection = await db.collection("movies");
    await collection.insertOne(newMovie);
    res.status(200).json({ msg: 'Add a movie successfully', newMovies: newMovie });
  } else {
    res.status(404).json({ msg: "Error route note found" });
  }
};