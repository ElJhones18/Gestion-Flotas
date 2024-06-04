const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTruck = async (req, res) => {
    const { plate, brand, model, color, fuel_consumption, load_capacity, rotation_programming, fuelId, driverId } = req.body;

    try {

        const newTruck = await prisma.truck.create({
            data: {
                plate: plate,
                brand: brand,
                model: model,
                color: color,
                fuel_consumption: fuel_consumption,
                load_capacity: load_capacity,
                rotation_programming: rotation_programming,
                driverId: driverId,
                fuelId: fuelId
            }
        });
        res.json(newTruck);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el camión' });
    }
}

const listTruck = async (req, res) => {
    try {
        const truck = await prisma.truck.findMany();
        res.json(truck);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar los camiones' });
    }
};

const getTruck = async (req, res) => {
    try {
        const truck = await prisma.truck.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                fuel: true,
            }
        });
        res.json(truck);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el camión' });
    }
}

const editTruck = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            plate,
            brand,
            model,
            color,
            fuel_consumption,
            load_capacity,
            rotation_programming,
            fuelId,
            driverId
        } = req.body;

        const truckExistente = await prisma.truck.findUnique({
            where: {
                id: id
            }
        });

        if (!truckExistente) {
            return res.status(404).json({ error: 'El camión no existe' });
        }

        const truckEdit = {
            plate: plate || truckExistente.plate,
            brand: brand || truckExistente.brand,
            model: model || truckExistente.model,
            color: color || truckExistente.color,
            fuel_consumption: fuel_consumption || truckExistente.fuel_consumption,
            load_capacity: load_capacity || truckExistente.load_capacity,
            rotation_programming: rotation_programming || truckExistente.rotation_programming,
            fuelId: fuelId || truckExistente.fuelId,
            driverId: driverId || truckExistente.driverId

        }

        const truck = await prisma.truck.update({
            where: {
                id: id
            },
            data: truckEdit
        });
        res.json(truck);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al editar el camión' });
    }
}

const deleteTruck = async (req, res) => {
    try {
        const truck = await prisma.truck.delete({
            where: {
                id: req.params.id
            }
        });
        res.json(truck);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el camión' });
    }
}

module.exports = {
    createTruck,
    listTruck,
    getTruck,
    editTruck,
    deleteTruck
}