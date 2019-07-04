const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const http = require('http');
const formidable = require('formidable');


let items = JSON.parse(
    fs.readFileSync('items.json', { encoding: 'UTF-8' })
);

items.forEach(element => {
    element.booked = element.booked === "true";//trick to turn string into boolean
});


let users = JSON.parse(
    fs.readFileSync('users.json', { encoding: 'UTF-8' })
);


//sends all items
app
    .use(cors())
    .use(express.json())
    .get("/items", (req, res) => res.send(items));


//uploads a new item

app
    .post("/items", (req, res) => {
        let form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (err) console.log(err);

            const item = JSON.parse(fields.data);
            item.id = assignId(items);
            item.uuid = Date.now().toString();
            item.imageUrl = "http://localhost:3000/img/" + files.image.name;
            items.push(item);
            fs.writeFileSync('items.json', JSON.stringify(items));

            const tempPath = files.image.path;
            const permPath = __dirname + '/img/' + files.image.name;
            fs.rename(tempPath, permPath, function (err) {
                if (err) throw err;
                res.status(200).json({ message: 'success' });
            });
        });
    });

// serves static folder with pictures
app
    .use("/img", express.static(__dirname + "/img"));



//signs up a new user
app
    .get("/signup", (req, res) => res.send(users));//won't need get eventually, just to check users for now

app
    .post("/signup", (req, res) => {
        const check = doesUsernameExist(users, req.body.username);

        if (check === false) {
            req.body.userUuId = Date.now().toString();
            users.push(req.body);
            fs.writeFileSync('users.json', JSON.stringify(users), 'utf8');
            res.status(200).json({ message: 'success' });
        }
        else {
            res.status(200).json({ message: 'username is taken' });
            //read how angular deals with 404
        }
    });


//signs in an existing user
app
    .post("/signin", (req, res) => {

        let user = onLoggingSendUser(users, req.body.username, req.body.password);
        if (user) {
            user = JSON.parse(JSON.stringify(user));//that is how to make a copy of an object, that doesn't point to the original
            user.password = 'fakepassword';
            user.matchingPassword = "fakepassword";
            res.status(200).json({ message: 'success', user });
        }
        else {
            res.status(200).json({ message: 'wrong credentials' });
        }
    });

//adds/removes to/from the user basket
app
    .put("/items", (req, res) => {
        reactOnReserve(items, users, req.body.chosenItem, req.body.currentUser);
        fs.writeFileSync('items.json', JSON.stringify(items), 'utf8');
        res.status(200).json({ message: 'success', items });
    })

    
//creates a server
const server = http.createServer(app);
server.listen(3000, () => console.log("Server has been started"));



//functions 
const assignId = function (array) {
    let id;
    if (!array.length) {
        id = 1;
    }
    else {
        array.sort((element1, element2) => element2.id - element1.id);
        id = array[0].id + 1;
    }
    return id;
}

const doesUsernameExist = function (array, username) {
    let check = false;
    if (!array.length) {
        check = false;
    }
    else {
        array.forEach(element => {
            if (element.username === username) {
                check = true;
            }
        });
    }

    return check;
}

const onLoggingSendUser = function (array, username, password) {
    let user = null;
    array.forEach(element => {
        if (element.username === username && element.password === password) {
            user = element;
        }
    });
    return user;
}

const reactOnReserve = function (items, users, uuid, userUuId) {
    items.forEach(item => {
        if (item.uuid === uuid) {
            if (item.booked === false) {

                users.forEach(user => {
                    if (user.userUuId === userUuId) {
                        user.basket.push(item);
                    }
                });
                item.booked = true;
                item.userUuId = userUuId;
            }
            else {
                users.forEach(user => {
                    if (user.userUuId === userUuId) {
                        user.basket.splice(user.basket.findIndex(basketItem => basketItem.uuid === uuid), 1);
                    }
                });
                item.booked = false;
                item.userUuId = "";
            }
        }
    });
}