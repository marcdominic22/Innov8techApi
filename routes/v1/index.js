const express = require('express');
const router = express.Router();

  /**
 * @swagger
 * tags:
 *   name: Users
 *   description: Sample API CRUD Operations
 */

/**
 * @swagger
 * /v1/users:
 *   get:
 *     tags: [Users]
 *     description: Returns List of Users
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/users', (req, res) => {
  res.send('List of users');
});

/**
 * @swagger
 * /v1/users:
 *   get:
 *     tags: [Users]
 *     description: Returns User by Id
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Details of user ${userId}`);
});

/**
 * @swagger
 * /v1/users:
 *   post:
 *     tags: [Users]
 *     description: Receives data and responds with a message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Data received
 */
router.post('/users', (req, res) => {
  res.send('Create a new user');
});

/**
 * @swagger
 * /v1/users:
 *   put:
 *     tags: [Users]
 *     description: Updates User by Id
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Update user ${userId}`);
});

// Simple GET endpoint
/**
 * @swagger
 * /v1/users:
 *   delete:
 *     tags: [Users]
 *     description: Returns Hello World
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Delete user ${userId}`);
});

module.exports = router;