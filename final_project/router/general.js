const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post('/register', (req, res) => {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be test implemented" });
    const username = req.body.username;
    const password = req.body.password;

    if (username == null || username == "")
        return res.status(200).json({ message: "Please provide user name" });

    if (password == null || password == "")
        return res.status(200).json({ message: "Please provide user password" });

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
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
    const author = JSON.stringify(req.params.author);
    var book = "Cannot find that book";
    for (i = 1; i <= 10; i++) {
        let booky = JSON.stringify(books[i]);
        if (booky.includes(author)) {
            book = JSON.stringify(books[i]);
            //console.log(book);
        }
    }
    res.send(book);
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
