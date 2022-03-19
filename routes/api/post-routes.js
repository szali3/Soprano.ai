const router = require('express').Router();
const {
  getAllposts,
  getpostById,
  createpost,
  updatepost,
  removepost
} = require('../../controllers/post-controller');

// /api/post
router
  .route('/')
  .get(getAllposts)
  .post(createpost);

// /api/post/:id
router
  .route('/:id')
  .get(getpostById)
  .put(updatepost)
  .delete(removepost);

module.exports = router;