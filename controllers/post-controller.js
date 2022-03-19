const { User, Post } = require('../models');

const postController = {
  // get all posts
  getAllposts(req, res) {
    Post.find({})
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get post by id
  getpostById({ params }, res) {
    Post.findOne({ _id: params.id })
      .then(dbPostData => {
        // If no post is found, json error
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
        res.json(dbPostData)
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Create post
  createpost({ body }, res) {
    Post.create(body)
      .then(dbPostData => {
        // console.log("====================let see"+ userId + " " +_id)
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { posts:dbPostData._id } },
          { new: true }
        )
      })
      .then(dbUserData  => {
        // If no post is found, json error
        if (!dbUserData) {
            res.status(404).json({ message: 'post created but no user found with this id' });
            return;
        }
        res.json({ message: 'post created'});
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // update post by user ID
  updatepost({ params, body }, res) {
    Post.findOneAndUpdate(
      { _id: params.id },
       body, 
      { new: true, runValidators: true })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No though found with this id!' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },

  // delete post
  removepost({ params }, res) {
    Post.findOneAndDelete({ _id: params.id })
      .then(dbPostData => {
        // If no post is found, json error
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
          res.json(dbPostData)
      })
      .catch(err => res.json(err));
  },
};  

module.exports = postController;
