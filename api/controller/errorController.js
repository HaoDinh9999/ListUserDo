const AppError = require("../ultil/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value . Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message); // dung object de loop over value in object

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleFailEvery = () =>
  new AppError("Something wrong, please try again later", 404);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  console.log("33333333333333333");
  console.log(error);
  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (
    error._message === "Validation failed" ||
    error._message === "User validation failed"
  )
    error = handleValidationErrorDB(error);
  else error = handleFailEvery();
  //}
};
