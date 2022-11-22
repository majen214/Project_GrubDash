const router = require("express").Router({ mergeParams: true });
const controller = require("./dishes/dishes.controller");
const methodNOtAllowed = require("../errors/methodNotAllowed");


// TODO: Implement the /dishes routes needed to make the tests pass
// /dishes, and /dishes/:dishId and attach the handlers (create, read, update, and list) 
router
    .route("/")
    .get(controller.list)
    .post(controller.create)

router
    .route("/:dishId")

module.exports = router;
