const router = require('express').Router();

/* Test Routes for Middleware*/
/* Test Routes for Middleware*/

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');

const { User } = require('../../db/models');

// GET /api/set-token-cookie
router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
}));

const { restoreUser } = require('../../utils/auth.js');

// GET /api/restore-user
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);




module.exports = router;
