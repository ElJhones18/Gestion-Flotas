const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createAvailability = async (req, res) => {
    const { mechanical_condition, fuel_level, tire_pressure, engine_performance, truckId } = req.body
    try {

        if (!truckId) {
            return res.status(400).json({ error: 'El id del camión es obligatorio' });
        }

        const truckExist = await prisma.truck.findUnique({
            where: {
                id: truckId
            }
        });

        if (!truckExist) {
            return res.status(400).json({ error: 'El camión no existe' });
        }

        const newAvailability = await prisma.availability.create({
            data: {
                mechanical_condition: mechanical_condition,
                fuel_level: fuel_level,
                tire_pressure: tire_pressure,
                engine_performance: engine_performance,
                truckId: truckId
            }
        })
        res.json(newAvailability);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la disponibilidad' });
    }
}

const listAvailability = async (req, res) => {
    try {
        const availability = await prisma.availability.findMany();
        res.json(availability);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar las disponibilidades' });
    }
}

const getAvailability = async (req, res) => {
    try {
        const availability = await prisma.availability.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                truck: true
            }
        });
        res.json(availability);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la disponibilidad' });
    }
}

const updateAvailability = async (req, res) => {
    const { mechanical_condition, fuel_level, tire_pressure, engine_performance, truckId } = req.body
    try {

        const availabilityExist = await prisma.availability.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                truck: true
            }
        });

        const availabilityEdit = {
            mechanical_condition: mechanical_condition || availabilityExist.mechanical_condition,
            fuel_level: fuel_level || availabilityExist.fuel_level,
            tire_pressure: tire_pressure || availabilityExist.tire_pressure,
            engine_performance: engine_performance || availabilityExist.engine_performance,
            truckId: truckId || availabilityExist.truckId
        }

        const availability = await prisma.availability.update({
            where: {
                id: req.params.id
            },
            data: availabilityEdit,
            include: {
                truck: true
            }
        })
        res.json(availability);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la disponibilidad' });
    }
}

const deleteAvailability = async (req, res) => {
    try {
        const availability = await prisma.availability.delete({
            where: {
                id: req.params.id
            }
        });
        res.json({ message: 'Disponibilidad eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la disponibilidad' });
    }
}

module.exports = {
    createAvailability,
    listAvailability,
    getAvailability,
    updateAvailability,
    deleteAvailability
}