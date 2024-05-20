const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// SQL Server configuration
const config = {
  user: 'adminssn',
  password: 'Admin@123',
  server: 'car-rental-management-server.database.windows.net',
  database: 'Car-Rental_DMDD',
  options: {
    encrypt: true // For security
  }
};

// Function to execute SQL queries
async function executeQuery(query) {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL Error:', err);
    throw err;
  }
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Endpoint to add a new store to the Store table
app.post('/stores', async (req, res) => {
  const { StreetAddress, City, State, Country, Contact_No, Email_Address } = req.body;
  const query = `INSERT INTO Store (StreetAddress, City, [State], Country, Contact_No, Email_Address) VALUES ('${StreetAddress}', '${City}', '${State}', '${Country}', ${Contact_No}, '${Email_Address}')`;
  try {
    await executeQuery(query);
    res.status(201).send('Store added successfully');
  } catch (err) {
    res.status(500).send('Error adding store');
  }
});

// Endpoint to delete a store from the Store table
app.delete('/stores/:storeId', async (req, res) => {
  const storeId = req.params.storeId;
  const query = `DELETE FROM Store WHERE StoreID = ${storeId}`;
  try {
    await executeQuery(query);
    res.status(200).send('Store deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting store');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
