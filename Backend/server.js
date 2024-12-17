const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented  
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('author is authintecated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authintecated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        /* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});
app.get('/posts', async (req, res) => {
    try{
    console.log('get all posts request arrived');
    result=await pool.query('SELECT * FROM posts;')
    res.status(200).json(result.rows);
}catch{
    if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get posts' });
    }
}
    
});
app.post('/posts', async (req, res) => {
    try {
        const { email, content } = req.body;

        console.log('Processing request...');
        console.log('Email:', email, 'Content:', content);

        // Insert the post and fetch the inserted row
        const result = await pool.query(
            `INSERT INTO posts (user_id, post) 
             VALUES ((SELECT id FROM users WHERE email = $1), $2) 
             RETURNING id, user_id, post;`,
            [email, content]
        );

        // Check if the query returned a result
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Insert query failed: No rows returned');
        }

        const post = result.rows[0];
        console.log('Post added to DB:', post);

        // Send the inserted post back as JSON
        res.status(201).json(post);
    } catch (err) {
        console.error('Error:', err.message);

        // Send a JSON error response
        res.status(400).json({ error: err.message });
    }
});

app.delete('/posts/DeleteAll', function (req, res) {
    pool.query('DELETE FROM posts;', (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err});
        }

        console.log('All posts deleted');
        res.status(200).json({ message:result });
    });
});
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;    

    try {
        // Udelete post
        const result = await pool.query(
            `delete from posts where id = $1;`,
            [id]
        );

        // Check if any rows were deleted
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Send the updated post as the response
        console.log('Post updated successfully');
        res.status(200).json({message: "successfull delete"});
    } catch (err) {
        console.error('Error updating post:', err.message);
        res.status(500).json({ error: 'Failed to update post' });
    }
});
/*app.get('/posts/:id', async (req, res) => {
    const id = req.params;
    console.log('this is the id in server', id);

    try {
        const post = await pool.query(
            'SELECT * from POSTS WHERE posts.id = $1', [id]
        )
        if (!post) {
            console.log('im here')
            return res.status(404).send('Post not found');
        }
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching post');
    }
});*/

app.put('/posts/:id', async (req, res) => {
    const { post } = req.body; // Expect caption from the request body
    const { id } = req.params;    // Get id from the URL parameters

    // Validation: Check if caption is provided
    if (!post) {
        return res.status(400).json({ error: 'post is required' });
    }

    try {
        // Update the post with the new caption
        const result = await pool.query(
            'UPDATE posts SET post = $1 WHERE id = $2 RETURNING *;',
            [post, id]
        );

        // Check if any rows were updated
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Send the updated post as the response
        
        console.log('Post updated successfully');
        console.log(result.rows[0])
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error updating post:', err.message);
        res.status(500).json({ error: 'Failed to update post' });
    }
});
