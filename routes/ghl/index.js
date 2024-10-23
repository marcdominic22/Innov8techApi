const express = require('express');
const CryptoJS = require("crypto-js");
const config = require('../../config');
const router = express.Router();

const GhlSsoGuard = (req, res, next) => {
    // You can add your authentication logic here
    if (req.headers['x-sso-session']) {
        try {
            // Decrypt the x-sso-session header
            var bytes  = CryptoJS.AES.decrypt(req.headers['x-sso-session'], config.ghlSsoKey);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            
            // Attach the decrypted session to the request object
            req.body = originalText;
      
            // Proceed to the next middleware
            next();
          } catch (error) {
            return res.status(401).json({
              message: 'Failed to decrypt SSO session: ' + error.message,
            });
          }
      next();
    } else {
      return res.status(401).json({
        message: 'No SSO session key provided, did you forget to include the `x-sso-session` header?',
      });
    }
  };

  /**
 * @swagger
 * tags:
 *   name: SSO
 *   description: SSO related operations
 */

/**
 * @swagger
 * /ghl/sso:
 *   get:
 *     tags: [SSO]
 *     summary: Retrieve user info from the GHL SSO session.
 *     description: >
 *       Returns the combined user profile data from the incoming GHL SSO session and your app's back-end.
 *     parameters:
 *       - name: x-sso-session
 *         in: header
 *         required: true
 *         description: The SSO session key for your app, as returned by the GHL main app.
 *     responses:
 *       200:
 *         description: Successfully retrieved user info
 *       401:
 *         description: Unauthorized - no SSO session key provided
 */
router.get('/sso', GhlSsoGuard, (req, res) => {

    return res.json(JSON.parse(req.body));
  });

  module.exports = router;