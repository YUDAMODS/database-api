// server.js
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// URL JSON Database
const DATABASE_URL = "https://raw.githubusercontent.com/INVISIBLENOTFAMOUS/clientdatabase/refs/heads/main/database.json";

app.get("/", async (req, res) => {
  const { database } = req.query;

  if (!database) {
    return res.status(400).send("Please provide a 'database' query parameter.");
  }

  try {
    // Fetch the JSON database
    const response = await axios.get(DATABASE_URL);
    const data = response.data;

    // Check if the number exists in the database
    const isFound = data.users.some((user) => user.x === database);

    // Return the result
    res.json({ result: isFound });
  } catch (error) {
    res.status(500).send("Error fetching the database.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
