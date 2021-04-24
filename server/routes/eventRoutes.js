const express = require("express");
const eventControllers = require("../controllers/eventControllers");
const router = express.Router();

// @route - /api/v1/events/
router
  .route("/")
  .get(eventControllers.getAllEvents)
  .post(eventControllers.createNewEvent);

// @route - /api/v1/event/someid
router
  .route("/:id")
  .put(eventControllers.updateEventById)
  .delete(eventControllers.deleteEventById);

module.exports = router;