const ObjectModel = require('../models/Object');

/**
* Objects.js
*
* @description :: API endpoint for managing Object models.
*/
module.exports = {

  /**
  * Objects.list()
  */
  list: (req, res) => {
    ObjectModel.find({})
    .then(objects => {
      return res.status(200).json(objects)
    })
    .catch(error => {
      return res.status(500).send(error);
    });
  },

  /**
  * Objects.show()
  */
  show: (req, res) => {
    ObjectModel.findOne({
      _id: req.params.id,
      client: req.user.client
    })
    .then(object => {
      if(!object) return res.status(404).send('Object not found.');
      return res.status(200).json(object);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
  },

  /**
  * Objects.create()
  */
  create: (req, res) => {
    const object = new ObjectModel({
      data : req.body.data,
      type : req.body.type,
      links: req.body.links,
      client: req.user.client
    });
    object.save()
    .then(object => {
      return res.status(200).json(object);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
  },

  /**
  * Objects.update()
  */
  update: (req, res) => {
    ObjectModel.findOne({
      _id: req.params.id,
      client: req.user.client
    })
    .then(object => {
      if (req.body.data) {
        if (typeof req.body.data === 'object' && !Array.isArray(req.body.data)) {
          object.data = Object.assign(object.data, req.body.data);
        } else {
          throw '`data` must be a JSON Object';
        }
      }
      ['type', 'links'].forEach(attr => {
        object[attr] = req.body.hasOwnProperty(attr) ? req.body[attr] : object[attr];
      });
      return object.save();
    })
    .then(object => {
      return res.status(200).json(object);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
  },

  /**
  * Objects.remove()
  */
  remove: (req, res) => {
    ObjectModel.findOne({
      _id: req.params.id,
      client: req.user.client
    })
    .then(object => {
      object.delete(req.user);
    })
    .then(object => {
      return res.status(200).json(object);
    })
    .catch(object => {
      return res.status(500).send(error);
    });
  }
};
