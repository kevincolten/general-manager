const express = require('express');
const router = express.Router();
const Objects = require('../controllers/Objects');

/*
* GET
*/
router.get('/', Objects.list);

/*
* GET
*/
router.get('/:id', Objects.show);

/*
* POST
*/
router.post('/', Objects.create);

/*
* PUT
*/
router.put('/:id', Objects.update);

/*
* DELETE
*/
router.delete('/:id', Objects.remove);

module.exports = router;
