const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

let PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/vendor", async (req, res) => {
  try {
    const all_vendors = await pool.query("SELECT * FROM Vendor");
    res.json(all_vendors.rows);
  } catch (err) {
    console.error(err.message);
  }
})

app.get("/vendor/:vendor_id", async (req, res) => {
  const { vendor_id } = req.params;
  try {
    const vendor = await pool.query("SELECT * FROM Vendor WHERE vendorcode = $1", [vendor_id]);
    if(vendor.rows.length === 0) {
      res.status(404).send("Vendor not found");
    } else {
      res.json(vendor.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
  }
})

app.get("/all_todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM Todo");
    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
  }
})

app.post("/todo/new", async (req, res) => {
  const my_description = req.body.my_description
  try {
    const newTodo = await pool.query("INSERT INTO TODO (description) VALUES ($1) RETURNING *", [my_description])
    res.json("New todo added successfully");
  } catch (err) {
    console.error(err.message);
  }
})

app.delete("/vendor/:vendor_id", async (req, res) => {
  try {
    const deleteTodo = await pool.query("DELETE FROM Vendor WHERE vendorcode = $1", [req.params.vendor_id]);
    res.json("Todo deleted successfully");
  } catch (err) {
    console.error(err.message);
  }
})

app.post("/vendor", async (req, res) => {
  const { vendorcode, name, contactperson, areacode, phone, country, previousorder } = req.body;
  try {
    const newVendor = await pool.query("INSERT INTO Vendor VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
    [vendorcode, name, contactperson, areacode, phone, country, previousorder])
    res.json(newVendor.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("A problem occured while adding a new vendor");
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});

app.listen(3002, () => {
  console.log(`Server is listening on Port ${PORT + 1}`);
});