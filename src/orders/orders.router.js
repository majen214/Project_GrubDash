const router = require("express").Router({ mergeParams: true });
const controller = require("./orders/orders.controller");

// create, read, update, delete, and list

router
    .route("/")
    .get(controller.list)
    .post(controller.create);

router 
    .route("/:orderId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;
