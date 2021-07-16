const mongoose = require('../config/db');
const dbService = require('./dbService');

const deleteDependentWarning = async (possibleDependent, refId) => Promise.all(possibleDependent.map(async (e) => {
  try {
    const allRecords = {};
    const where = {};
    where[e.refId] = refId;
    const query = await dbService.countDocument(mongoose.model(e.model), where);
    allRecords.model = e.model;
    allRecords.count = query;
    return allRecords;
  } catch (error) {
    throw new Error(error.message);
  }
}));

const deleteDependent = async (possibleDependent, refId) => Promise.all(possibleDependent.map(async (e) => {
  try {
    const where = {};
    where[e.refId] = refId;
    return await mongoose.model(e.model).deleteMany(where);
  } catch (error) {
    throw new Error(error.message);
  }
}));

const softDeleteDependent = (possibleDependent, refId) => Promise.all(possibleDependent.map(async (e) => {
  try {
    const where = {};
    where[e.refId] = refId;
    const query = await mongoose.model(e.model).updateMany(where, { isDeleted: true });
    return query;
  } catch (error) {
    throw new Error(error.message);
  }
}));

module.exports = {
  deleteDependentWarning, deleteDependent, softDeleteDependent,
};
