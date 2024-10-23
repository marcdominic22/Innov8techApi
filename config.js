require('dotenv').config();

module.exports = {
    port: process.env.SERVER_PORT || 3000,
    ghlSsoKey: process.env.GHL_SSO_KEY,
};