const express = require('express');
const multer = require('multer');
const usersController = require('./src/controllers/users.controller');
const tasksController = require('./src/controllers/task.controller');
const travelsController = require('./src/controllers/travel.controller');
const stopsController = require('./src/controllers/stop.controller');
const fuelController = require('./src/controllers/fuel.controller');
const trucksController = require('./src/controllers/truck.controller');
const checklistController = require('./src/controllers/checklist.controller');
const authController = require('./src/controllers/auth/auth.controller');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', // Cambia esto al dominio desde el que esperas recibir las solicitudes
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (como IE11) necesitan esto
}

app.use(cors(corsOptions));

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

app.post('/signup', authController.signup);

app.post('/login', authController.login)

// --------------------------------------------

// Endpoint para crear una nueva tarea
app.post('/tasks/create', tasksController.createTask);

// Endpoint para listar todas las tareas
app.get("/tasks/", tasksController.listTask);

// Endpoint para buscar una tarea por su id
app.get("/tasks/:id", tasksController.getTask);

// Endpoint para buscar tareas de un usuario
app.get("/tasks/user/:id", tasksController.getTasksByUser);

// Endpoint para actualizar una tarea por su id
app.patch('/tasks/edit/:id', tasksController.editTask);

// Endpoint para eliminar una tarea por su id
app.delete('/tasks/delete/:id', tasksController.deleteTask);

// --------------------------------------------

// Endpoint para crear un nuevo viaje
app.post('/travel/create', travelsController.createTravel);

// Endpoint para listar todos los viajes
app.get("/travels/", travelsController.listTravel);

// Endpoint para buscar un viaje por su id
app.get("/travel/:id", travelsController.getTravel);

// Endpoint para actualizar un viaje por su id
app.patch('/travel/edit/:id', travelsController.editTravel);

// Endpoint para eliminar un viaje por su id
app.delete('/travel/delete/:id', travelsController.deleteTravel);

// --------------------------------------------

// Endpoint para crear una nueva parada
app.post('/stop/create', stopsController.createStop);

// Endpoint para listar todas las paradas
app.get("/stops/", stopsController.listStop);

// Endpoint para buscar una parada por su id
app.get("/stop/:id", stopsController.getStop);

// Endpoint para actualizar una parada por su id
app.patch('/stop/edit/:id', stopsController.editStop);

// Endpoint para eliminar una parada por su id
app.delete('/stop/delete/:id', stopsController.deleteStop);

// --------------------------------------------

// Endpoint para crear un nuevo combustible
app.post('/fuel/create', fuelController.createFuel);

// Endpoint para listar todos los combustibles
app.get("/fuels/", fuelController.listFuel);

// Endpoint para buscar un combustible por su id
app.get("/fuel/:id", fuelController.getFuel);

// Endpoint para actualizar un combustible por su id
app.patch('/fuel/edit/:id', fuelController.editFuel);

// Endpoint para eliminar un combustible por su id
app.delete('/fuel/delete/:id', fuelController.deleteFuel);

// --------------------------------------------

// Endpoint para crear un nuevo camion
app.post('/truck/create', upload.single('photo'), trucksController.createTruck);

// Endpoint para listar todos los camiones
app.get("/trucks/", trucksController.listTruck);

// Endpoint para buscar un camion por su id
app.get("/truck/:id", trucksController.getTruck);

// Endpoint para actualizar un camion por su id
app.patch('/truck/edit/:id', trucksController.editTruck);

// Endpoint para eliminar un camion por su id
app.delete('/truck/delete/:id', trucksController.deleteTruck);

// --------------------------------------------

// Endpoint para crear un nuevo checklist
app.post('/checklist/create', checklistController.createChecklist);

// Endpoint para listar todos los checklist
app.get("/checklists/", checklistController.listChecklist);

// Endpoint para buscar un checklist por su id
app.get("/checklist/:id", checklistController.getChecklist);

// Endpoint para actualizar un checklist por su id
app.patch('/checklist/edit/:id', checklistController.editChecklist);

// Endpoint para eliminar un checklist por su id
app.delete('/checklist/delete/:id', checklistController.deleteChecklist);