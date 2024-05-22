const express = require('express');
const multer = require('multer');
const usersController = require('./src/controllers/users.controller');
const driversController = require('./src/controllers/driver.controller');
const tasksController = require('./src/controllers/task.controller');
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

// Endpoint para crear un nuevo usuario 
app.post('/users/create', upload.single('avatar'), usersController.createUser);

// Endpoint para listar todos los usuarios 
app.get("/users/", usersController.listUsers);

// Endpoint para buscar un usuario por su id
app.get("/users/:id", usersController.getUser);

// Endpoint para actualizar un usuario por su id
app.patch('/users/edit/:id', upload.single('avatar'), usersController.editUser);

// Endpoint para eliminar un usuario por su id
app.delete('/users/delete/:id', usersController.deleteUser);

// --------------------------------------------

// Endpoint para crear un nuevo conductor
app.post('/drivers/create', driversController.createDriver);

// Endpoint para listar todos los conductores
app.get("/drivers/", driversController.listDriver);

// Endpoint para buscar un conductor por su id
app.get("/drivers/:id", driversController.getDriver);

// Endpoint para actualizar un conductor por su id
app.patch('/drivers/edit/:id', driversController.editDriver);

// Endpoint para eliminar un conductor por su id
app.delete('/drivers/delete/:id', driversController.deleteDriver);

// --------------------------------------------

// Endpoint para crear una nueva tarea
app.post('/tasks/create', tasksController.createTask);

// Endpoint para listar todas las tareas
app.get("/tasks/", tasksController.listTask);

// Endpoint para buscar una tarea por su id
app.get("/tasks/:id", tasksController.getTask);

// Endpoint para actualizar una tarea por su id
app.patch('/tasks/edit/:id', tasksController.editTask);

// Endpoint para eliminar una tarea por su id
app.delete('/tasks/delete/:id', tasksController.deleteTask);