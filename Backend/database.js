const { Pool } = require('pg');
const fs = require('fs'); // Using fs.readFileSync for synchronous reading

const pool = new Pool({
    user: "postgres",
    password: "password", // Add your password
    database: "postgres",
    host: "localhost",
    port: 5432
});

// Function to read the file and parse JSON data synchronously
function readFileTest(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8'); // Using fs.readFileSync
        return JSON.parse(data);  // Return parsed JSON data
    } catch (err) {
        console.error('Error reading JSON file:', err);
        return null;
    }
}

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
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL,
        post JSON NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

// Main function to execute everything
async function run() {
    // Create the tables
    await execute(createTblQuery);
    console.log('Table "users" is created');

    await execute(createTblPost);
    console.log('Table "posts" is created');

    // Read the JSON file
    const postContent = readFileTest("./testPostRow.json");
    console.log(postContent);
    
    if (postContent) {
        const userId = uuid(); // Assuming you have a user with id 12
        const insertQuery = `
            INSERT INTO posts (user_id, post)
            VALUES ($1, $2);
        `;
        await execute(insertQuery, [userId, postContent]);
        console.log('Post is added');
    } else {
        console.log('Failed to read post content');
    }
}

// Run the script
run().catch(err => console.error('Error in run function:', err));

module.exports = pool;
