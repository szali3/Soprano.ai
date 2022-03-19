const { User, Post } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select('-__v')
      .populate('friends')
      // .populate('thoughts')
      .then(dbUserData => {
        // If no user is found, send error
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          // If no user is found, error
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
    },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
       if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return ;
      }

      // code for bonus here

      res.json(dbUserData);
    })
      .catch(err => res.json(err));
  }
};  

module.exports = userController;