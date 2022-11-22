const path = require("path");

// Use the existing dishes data
//create, read, update, and list dishes. Note that dishes cannot be deleted.
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

//GET /dishes This route will respond with a list of all existing dish data.
function list (req, res) {
    res.json({ data: dishes });
}

//POST /dishes This route will save the dish and respond with the newly created dish.
//add validation to include name, description, price, image_url

function bodyHasNameProperty(req, res, next) {
    const { data: { name } = { } } = req.body;
    if (name) {
        return next();
    }
    next({
        status: 400, 
        message: "A 'name' property is required.",
    })
}

function bodyHasDescriptionProperty(req, res, next) {
    const { data: { name } = { } } = req.body;
    if (name) {
        return next();
    }
    next({
        status: 400, 
        message: "A 'name' property is required.",
    })
}



module.exports = {
    list,
}
