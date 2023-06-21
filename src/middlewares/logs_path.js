const print_log_path = (req, res, next) => {
  console.log(`API Hitted from ${req.path}`);
  next();
};

module.exports = print_log_path;
