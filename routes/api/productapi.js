const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const { isLogedIn } = require("../../middleware");

router.post("/product/:id/like", isLogedIn, async (req, res) => {
  const productId = req.params.id;
  // console.log(`${productId}`);

  // Backend side liked and disliked program
  if (req.user.wishlist.includes(productId)) {
    console.log("Disliked");
    req.user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishlist: productId },
      },
      { new: true }
    );
  } else {
    console.log("Liked");
    req.user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { wishlist: productId },
      },
      { new: true }
    );
  }
  res.send(req.user);
});

module.exports = router;
