const Service = require("../models/serviceModel");

//Description:  Create New
//Route:        POST - api/services/create
//Access:       Public
const createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(200).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Description:  Get All Services
//Route:        GET - api/services/all
//Access:       Public
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description:  Get One By ID
//Route:        GET - api/services/:id
//Access:       Public
const getServiceById = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description:  Update Service
//Route:        PUT - api/services/update/:id
//Access:       Private
const updateServiceById = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Service.findByIdAndUpdate(serviceId, req.body, {
      new: true,
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description:  Delete Service by ID
//Route:        DELETE - api/services/delete
//Access:       Private
const deleteServiceById = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Service.findByIdAndDelete(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
