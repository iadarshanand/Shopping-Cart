const { productSchema, reviewSchema } = require("./schema");
const passport = require("passport");
const Product = require("./models/product");

module.exports.validateProduct = (req, res, next) => {
  const { name, img, price, desc } = req.body;
  const { error } = productSchema.validate({
    name,
    img,
    desc,
    price,
  });
  console.log(error);

  if (error) {
    const msg = error.details.map((err) => error.message).join(",");
    console.log(msg);
    return res.status(500).render("error", { e: msg });
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { rating, comment } = req.body;
  const { error } = reviewSchema.validate({ rating, comment });
  if (error) {
    const msg = error.details.map((err) => error.message).join(",");
    console.log(msg);
    return res.status(500).render("error", { e: msg });
  }
  next();
};

module.exports.isLogedIn = (req, res, next) => {
  // console.log(req.xhr);
  if (req.xhr && !req.isAuthenticated()) {
    // delete req.originalUrl;
    return res.status(401).json({ msg: "You need to log in first" });
  }

  if (!req.isAuthenticated()) {
    req.flash("error", "You need to login first to get access this");
    // console.log(req.originalUrl);
    req.session.priviousUrl = req.originalUrl;
    return res.redirect("/login");
  }
  next();
};

module.exports.isSeller = (req, res, next) => {
  if (req.user.role !== "seller") {
    req.flash("error", "You have not authorized to do that");
    return res.redirect("/products");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product.author || !product.author.equals(req.user._id)) {
    req.flash("error", "You have not authorized to do that");
    return res.redirect("/products");
  }
  next();
};
