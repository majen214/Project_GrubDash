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
//add validation to include name, description, price, image_url in POST orders

function bodyDataHas(propertyName) {
    return function(req, res, next) {
        const { data = {} } = req.body;
        if (data[propertyName]) {
            return next();
        }
        next({
            status: 400, 
            message: `Dish must include a ${propertyName}`
        });
    }
}

function bodyHasNameProperty(req, res, next) {
    const { data: { name } = { } } = req.body;
    const invalidName = "";
    if (name.includes(invalidName)) {
        next();
    } else if (name) {
        return next();
    }
    next({
        status: 400, 
        message: "Dish must include a name.",
    })
}

function bodyHasDescriptionProperty(req, res, next) {
    const { data: { description } = { } } = req.body;
    if (description && !"") {
        return next();
    }
    next({
        status: 400, 
        message: "Dish must include a description.",
    })
}

function bodyHasPriceProperty(req, res, next) {
    const { data: { price } = { } } = req.body;
    if (!price) {
        return next();
    }
    next({
        status: 400, 
        message: "Dish must include a price.",
    })
}

function integerPriceProperty(req, res, next) {
    const { data: { price } = { } } = req.body;
    if (price < 0 && Number(price)) {
        return next();
    }
    next({
        status: 400, 
        message: "Dish must include a price.",
    })
}

function bodyHasImageUrlProperty(req, res, next) {
    const { data: { image_url } = { } } = req.body;
    if (image_url) {
        return next();
    }
    next({
        status: 400, 
        message: "Dish must include a image_url.",
    })
}

const findDishId = (dishId) => {
    return dishes.find((id) => dishes.id === Number(id));
}

//validation
function dishIdExists(req, res, next) {
    const { id } = req.params;
    const dishId = findDishId(id);
    if (dishId) {
        return next();
    }
    next({
        status: 404, 
        message: "Dish does not exist: ${dishId}.",
    })
}

function invalidDishId(req, res, next) {
    const { id } = req.params;
    const dishId = findDishId(id);
    if (dishId !== id) {
        return next();
    }
    next({
        status: 404, 
        message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`,
    })
}

function read(req, res, next) {
    const { id } = req.params;
    const dishId = findDishId(id);
    if (dishId === id) {
        return next();
    }
    next({
        status: 404, 
        message: "No matching dish ID found.",
    })
}

function update(req, res, next) {
    const { id } = req.params;
    const dishId = findDIshId(id);
    if (dishId !== id) {
        return next();
    }
}

function create(req, res) {
    const { data: { name, description, price, image_url } = {} } = req.body;
    const newDish = {
        id, 
        name, 
        description, 
        price, 
        image_url,
    };
    dishes.push(newDish);
    res.status(201).json({ data: newDish });
}

module.exports = {
    list,
    read: [read],
    update: [dishIdExists, invalidDishId, update],
    create: [
        bodyDataHas("name"),
        bodyDataHas("description"),
        bodyDataHas("price"),
        bodyDataHas("image_url"),
        create,
    ]
}
