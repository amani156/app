const Event = require("../models/Event");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllEvents = asyncHandler(async (req, res, next) => {
  let query;

  let uiValues = {
    filtering: {},
    sorting: {},
  };

  const reqQuery = { ...req.query };

  const removeFields = ["sort"];

  removeFields.forEach((val) => delete reqQuery[val]);

  const filterKeys = Object.keys(reqQuery);
  const filterValues = Object.values(reqQuery);

  filterKeys.forEach(
    (val, idx) => (uiValues.filtering[val] = filterValues[idx])
  );

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Event.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortByArr = req.query.sort.split(",");

    sortByArr.forEach((val) => {
      let order;

      if (val[0] === "-") {
        order = "descending";
      } else {
        order = "ascending";
      }

      uiValues.sorting[val.replace("-", "")] = order;
    });

    const sortByStr = sortByArr.join(" ");

    query = query.sort(sortByStr);
  } else {
    query = query.sort("-price");
  }

  const events = await query;

  const maxPrice = await Event.find()
    .sort({ price: -1 })
    .limit(1)
    .select("-_id price");

  const minPrice = await Event.find()
    .sort({ price: 1 })
    .limit(1)
    .select("-_id price");

  uiValues.maxPrice = maxPrice[0].price;
  uiValues.minPrice = minPrice[0].price;

  res.status(200).json({
    success: true,
    data: events,
    uiValues,
  });
});

exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    data: event,
  });
});

exports.updateEventById = asyncHandler(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event with id ${req.params.id} was not found`, 404)
    );
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: event,
  });
});

exports.deleteEventById = asyncHandler(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event with id ${req.params.id} was not found`, 404)
    );
  }

  await event.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});