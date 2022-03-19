const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    title: {
      type: String,
      required: true,
      maxlength: 280
    },
    description: {
      type: String,
      required: true,
      maxlength: 280
    },
    name: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);


const Post = model('Post', postSchema);

module.exports = Post;
