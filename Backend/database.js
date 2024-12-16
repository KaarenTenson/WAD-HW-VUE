const { Pool } = require('pg');
const fs = require('fs'); // Using fs.readFileSync for synchronous reading

const pool = new Pool({
    user: "postgres",
    password: "postgres", // Add your password
    database: "postgres",
    host: "localhost",
    port: 5433
});

// Function to read the file and parse JSON data synchronously
// Function to execute a query with parameters
const execute = async (query, params = []) => {
    try {
        const client = await pool.connect(); // Create a connection
        await client.query(query, params);  // Execute the query with parameters
        client.release(); // Release the client back to the pool
        return true;
    } catch (error) {
        console.error('Error executing query:', error.stack);
        return false;
    }
};

// Queries for creating tables
const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );
`;

const createTblPost = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        post JSON NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;
// Main function to execute everything
async function run() {
    // Create the tables
    await execute(createTblQuery);
    console.log('Table "users" is created');

    await execute(createTblPost);
    console.log('Table "posts" is created');

    // Read the JSON file

}

// Run the script
run().catch(err => console.error('Error in run function:', err));

module.exports = pool;
