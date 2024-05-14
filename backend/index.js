const express = require('express');
const multer = require('multer');
const usersController = require('./src/controllers/users.controller');
const conductorController = require('./src/controllers/conductor.controller');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

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

//----------------------------------------------------------------

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

//----------------------------------------------------------------

// Endpoint para crear un conductor
app.post('/conductor/create', conductorController.CreateConductor);

// Endpoint para listar todos los conductores
app.get('/conductor/', conductorController.ListConductor);

// Endpoint para buscar un conductor por su id
app.get('/conductor/:id', conductorController.getConductor);

// Endpoint para actualizar un conductor por su id
app.put('/conductor/edit/:id', conductorController.editConductor);

// Endpoint para eliminar un conductor por su id
app.delete('/conductor/delete/:id', conductorController.deleteConductor);