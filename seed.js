const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/Shopping_APP")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

const Products = [
  {
    name: "Iphone",
    img: "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_960_720.jpg",
    price: 100,
    avgRating: 0,
    desc: "The new iPhone SE, and iPhone 13 & iPhone 13 Pro in two shades of green. Buy now. Wide camera. Retina display. Privacy built in. Water resistant. Services: Free no-contact delivery, Chat with a Specialist, Online Personal Session",
  },
  {
    name: "Nikon",
    img: "https://cdn.pixabay.com/photo/2018/10/16/21/12/slr-camera-3752509__340.jpg",
    price: 50,
    avgRating: 0,
    desc: "The new iPhone SE, and iPhone 13 & iPhone 13 Pro in two shades of green. Buy now. Wide camera. Retina display. Privacy built in. Water resistant. Services: Free no-contact delivery, Chat with a Specialist, Online Personal Session",
  },
  {
    name: "Nike",
    img: "https://cdn.pixabay.com/photo/2020/07/15/18/26/footwear-5408643__340.jpg",
    price: 27,
    avgRating: 0,
    desc: "The new iPhone SE, and iPhone 13 & iPhone 13 Pro in two shades of green. Buy now. Wide camera. Retina display. Privacy built in. Water resistant. Services: Free no-contact delivery, Chat with a Specialist, Online Personal Session",
  },
  {
    name: "Macbook",
    img: "https://cdn.pixabay.com/photo/2016/03/27/20/00/coffee-1284041__340.jpg",
    price: 100,
    avgRating: 0,
    desc: "The new iPhone SE, and iPhone 13 & iPhone 13 Pro in two shades of green. Buy now. Wide camera. Retina display. Privacy built in. Water resistant. Services: Free no-contact delivery, Chat with a Specialist, Online Personal Session",
  },
  {
    name: "Iphone",
    img: "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_960_720.jpg",
    price: 100,
    avgRating: 0,
    desc: "The new iPhone SE, and iPhone 13 & iPhone 13 Pro in two shades of green. Buy now. Wide camera. Retina display. Privacy built in. Water resistant. Services: Free no-contact delivery, Chat with a Specialist, Online Personal Session",
  },
  {
    name: "Nikon",
    img: "https://cdn.pixabay.com/photo/2018/10/16/21/12/slr-camera-3752509__340.jpg",
    price: 50,
    avgRating: 0,
    desc: "The new iPhone SE, and iPhone 13 & iPhone 13 Pro in two shades of green. Buy now. Wide camera. Retina display. Privacy built in. Water resistant. Services: Free no-contact delivery, Chat with a Specialist, Online Personal Session",
  },
  {
    name: "Nike",
    img: "https://cdn.pixabay.com/photo/2020/07/15/18/26/footwear-5408643__340.jpg",
    price: 27,
    avgRating: 0,
    desc: "The new iPhone SE, and iPhone 13 & iPhone 13 Pro in two shades of green. Buy now. Wide camera. Retina display. Privacy built in. Water resistant. Services: Free no-contact delivery, Chat with a Specialist, Online Personal Session",
  },
  {
    name: "Macbook",
    img: "https://cdn.pixabay.com/photo/2016/03/27/20/00/coffee-1284041__340.jpg",
    price: 100,
    avgRating: 0,
    desc: "The new iPhone SE, and iPhone 13 & iPhone 13 Pro in two shades of green. Buy now. Wide camera. Retina display. Privacy built in. Water resistant. Services: Free no-contact delivery, Chat with a Specialist, Online Personal Session",
  },
];

async function seedDB() {
  await Product.deleteMany({});
  await Product.insertMany(Products);
  console.log("Products seeded");
}

seedDB();
