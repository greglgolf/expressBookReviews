const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    res.send(JSON.stringify(books, null, 4));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn]);

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    const author = req.params.author;
    if (!author) return res.status(300).json({ message: "No author" });
    res.send(books[author]);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const title = JSON.stringify(req.params.title);
    var book = "Cannot find that book";
    for (i = 1; i <= 10; i++) {
        let booky = JSON.stringify(books[i]);
        if (booky.includes(title)) {
            book = JSON.stringify(books[i]);
            //console.log(book);
        }
    }
  
    res.send(book);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    let filtered_book = books[isbn]
    res.send(filtered_book.reviews);
});

module.exports.general = public_users;
