const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { User, SchoolClass } = require('../models');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(80).required(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required(),
  role: Joi.string().valid('teacher', 'student').required(),
  teacher_code: Joi.string().when('role', {
    is: 'teacher',
    then: Joi.string().required(),
    otherwise: Joi.string().optional().allow(''),
  }),
  class_id: Joi.number().when('role', {
    is: 'student',
    then: Joi.number().required(),
    otherwise: Joi.number().optional().allow(null),
  }),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post('/register', validateRequest(registerSchema), async (req, res) => {
  try {
    const { username, password, role, teacher_code, class_id } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Vérifier le code enseignant
    if (role === 'teacher' && teacher_code !== 'SCHOOL2025') {
      return res.status(400).json({ error: 'Invalid teacher registration code' });
    }

    // Vérifier la classe pour les étudiants
    if (role === 'student' && class_id) {
      const schoolClass = await SchoolClass.findByPk(class_id);
      if (!schoolClass) {
        return res.status(400).json({ error: 'Invalid class ID' });
      }
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
      current_class_id: role === 'student' ? class_id : null,
    });

    res.status(201).json({
      message: 'Registration successful',
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { username, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
