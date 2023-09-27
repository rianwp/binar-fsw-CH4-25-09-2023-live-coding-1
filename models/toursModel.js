const mongoose = require("mongoose")

const database = "mongodb://127.0.0.1:27017/tours"

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB sukses terkoneksi")
  })

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama harus ada"],
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [true, "Harga harus ada"],
  },
})

const Tour = mongoose.model("Tour", tourSchema)

// const testTour = new Tour({
//   rating: 4.8,
//   price: 20000,
// })

module.exports = Tour
