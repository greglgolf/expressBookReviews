const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const session = require('express-session');
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    //return res.status(300).json({ message: "Yet to be implemented" });
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password)
    });
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.post("/auth/review/:isbn", (req, res) => {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });

    let book = books[req.params.isbn];
    let review = req.body.review;
    let user = req.body.username;

    if (book) { //Check is book exists
        let reviewsArray = Object.values(book.reviews);
        reviewsArray.push(user + " review: " + review);
        books[req.params.isbn].reviews = reviewsArray;
        //console.log(JSON.stringify(books));
        res.send(`Book with the ISBN  ${req.params.isbn} updated. with review : ${review}`);
    }
    else {
        res.send("Unable to find Book");
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let book = books[req.params.isbn];
    if (book) { //Check is book exists       
        books[req.params.isbn].reviews = [];
        //console.log(JSON.stringify(book));
        res.send(`Book review with the ISBN  ${req.params.isbn} deleted`);
    } else
        res.send(`book with the isbn  ${isbn} not found.`);

        
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
