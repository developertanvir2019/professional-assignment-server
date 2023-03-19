const fs = require('fs');
const usersData = fs.readFileSync('users.json');
const users = JSON.parse(usersData);


module.exports.randomUser = async (req, res, next) => {
    try {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];
        res.send(randomUser);
    } catch (error) {
        next(error);
    }
};

module.exports.allUser = async (req, res, next) => {
    try {
        let limit = parseInt(req.query.limit);
        if (isNaN(limit) || limit <= 0) {
            limit = users.length;
        }
        const limitedUsers = users.slice(0, limit);

        res.send(limitedUsers);
    } catch (error) {
        next(error);
    }
}

module.exports.addUsers = async (req, res, next) => {
    try {
        const newUser = {
            id: Math.random() * 10000,
            gender: req.body.gender,
            name: req.body.name,
            contact: req.body.contact,
            address: req.body.address,
            photoUrl: req.body.photoUrl,
        };
        // Validate the request body to ensure all required properties are present
        if (!newUser.name || !newUser.address || !newUser.photoUrl) {
            res.status(400).send('Name, address, and photoUrl are required');
            return;
        }
        // Add the random user to the array of users
        users.push(newUser);
        res.send(newUser)
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { gender, name, contact, address, photoUrl } = req.body;
        const userIndex = users.findIndex((user) => user.id === userId);
        // Validate the user ID
        if (userIndex === -1) {
            res.status(400).send(`User with ID ${userId} not found`);
            return;
        }
        // Update the user's information
        users[userIndex] = {
            ...users[userIndex],
            gender: gender || users[userIndex].gender,
            name: name || users[userIndex].name,
            contact: contact || users[userIndex].contact,
            address: address || users[userIndex].address,
            photoUrl: photoUrl || users[userIndex].photoUrl,
        };
        res.send(users[userIndex]);
    } catch (error) {
        next(error);
    }
};


module.exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).send('Invalid user id');
        }
        const index = users.findIndex(user => user.id === parseInt(id));
        if (index === -1) {
            return res.status(404).send('User not found');
        }
        users.splice(index, 1);
        res.send('user deleted successfully')

    } catch (error) {
        next(error)
    }
}