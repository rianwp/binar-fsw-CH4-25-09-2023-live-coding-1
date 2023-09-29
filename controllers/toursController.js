const fs = require("fs")

const Tour = require("../models/toursModel")

const checkId = async (req, res, next, val) => {
  try {
    const tours = await Tour.findById(val)
    next()
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${val} this not found`,
    })
  }
}

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      message: `name or price are required`,
    })
  }
  next()
}

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: "success",
      length: tours.length,
      data: {
        tours,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getTourById = async (req, res) => {
  try {
    const id = req.params.id
    const tour = await Tour.findById(id)

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: `data with ${req.params.id} this not found`,
    })
  }
}

const editTour = async (req, res) => {
  try {
    const id = req.params.id
    const updateTour =
      await Tour.findByIdAndUpdate(id, req.body, {
        new: true,
      })
    res.status(200).json({
      status: "success",
      data: {
        tour: updateTour,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: `data with ${req.params.id} this not found`,
    })
  }
}

const removeTour = async (req, res) => {
  try {
    const id = req.params.id
    const removeTour =
      await Tour.findByIdAndDelete(id)
    if (!removeTour) {
      return res.status(404).json({
        status: "failed",
        message: `data with ${id} this not found`,
      })
    }
    res.status(200).json({
      status: "success",
      data: {
        tour: null,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `data with ${req.params.id} this not found`,
    })
  }
}

module.exports = {
  getAllTours,
  getTourById,
  editTour,
  createTour,
  removeTour,
  checkId,
  checkBody,
}
