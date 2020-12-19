const { getDB } = require("./index");

module.exports.createQueriesForModel = function (collectionName) {
  const insert = function (user) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      const Model = db[collectionName];
      Model.create(user)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const findOne = function (pk) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      const Model = db[collectionName];
      Model.findByPk(pk)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  const findAll = function (condition) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      const Model = db[collectionName];
      Model.findAll({ where: condition })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const remove = function (id) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      const Model = db[collectionName];
      Model.findByPk(id)
        .then((user) => Model.destroy({ where: { id } }))
        .then((num) => {
          if (num == 1) {
            resolve({ user });
          } else {
            reject({
              message: `Cannot remove ${collectionName} with ${id}. Maybe ${collectionName} was not found!`,
            });
          }
        })
        .catch((err) => {
          reject({
            message: `Error deleting ${collectionName} with ${id}`,
            err,
          });
        })
        .catch((err) => reject(err));
    });
  };

  const update = function (condition, updatedData) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      const Model = db[collectionName];
      Model.update(updatedData, {
        where: condition,
      })
        .then((num) => {
          if (num == 1) {
            Model.findByPk(condition.id).then((result) => resolve(result));
            // resolve({
            //   message: `${collectionName} was updated successfully.`,
            // });
          } else {
            reject({
              message: `Cannot update ${collectionName} with ${condition}. Maybe ${collectionName} was not found is empty!`,
            });
          }
        })
        .catch((err) => {
          reject({
            message: `Error updating ${collectionName} with ${condition}`,
            err,
          });
        });
    });
  };

  return { insert, findOne, findAll, remove, update };
};
