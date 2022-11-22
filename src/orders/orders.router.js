const router = require("express").Router({ mergeParams: true });
const controller = require("./orders/orders.controller");

// create, read, update, delete, and list

router
    .route("/")

router 
    .route("/:orderId")
module.exports = router;
