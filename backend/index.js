const express = require('express');
const multer = require('multer');
const usersController = require('./src/controllers/users.controller');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

// middleware para subir archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

// Endpoint para crear un nuevo usuario 
app.post('/users/create', upload.single('avatar'), usersController.createUser);

// Endpoint para listar todos los usuarios 
app.get("/users/", usersController.listUsers);

// Endpoint para buscar un usuario por su id
app.get("/users/:id", usersController.getUser);

// Endpoint para actualizar un usuario por su id
app.patch('/users/edit/:id', usersController.editUser);

// Endpoint para eliminar un usuario por su id
app.delete('/users/delete/:id', usersController.deleteUser);