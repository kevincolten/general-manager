const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const version = require('mongoose-version');
const mongooseDelete = require('mongoose-delete');

const objectSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  type: {
    type: String,
    required: true,
    index: true
  },
  data: Object,
  links: [{
    type: Schema.Types.ObjectId,
    ref: 'object',
  }]
}, { timestamps: true });

objectSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.client;
    delete ret.__v;
    return ret;
  }
});

objectSchema.plugin(uniqueValidator);
objectSchema.plugin(mongooseDelete, {
  deletedAt : true,
  deletedBy : true,
  overrideMethods: true
});
objectSchema.plugin(version, { collection: 'objects__versions' });

module.exports = mongoose.model('object', objectSchema);
