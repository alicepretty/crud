const { Router } = require ('express');
const auth = require('./auth');
const blogs = require('./blogRoutes');
const comments = require('./comment');

const router = Router();

router.use('/auth', auth);
router.use('/blogs', blogs);
router.use('/blogs/comments', comments);

module.exports = router;
