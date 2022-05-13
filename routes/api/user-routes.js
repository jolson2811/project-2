const router = require('express').Router();
const { User } = require('../../models');

// /api/users

// GET all
router.get('/', (req,res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

// GET one
router.get('/:id', (req,res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
});

// POST user
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

// DELETE user
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;