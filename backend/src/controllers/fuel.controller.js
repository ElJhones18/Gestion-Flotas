const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createFuel = async (req, res) => {
    const { cost, efficiency, brand } = req.body
    try {
        const newFuel = await prisma.fuel.create({
            data: {
                cost: cost,
                efficiency: efficiency,
                brand: brand
            }
        })
        res.json(newFuel);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el combustible' });
    }
}

const listFuel = async (req, res) => {
    try {
        const fuel = await prisma.fuel.findMany();
        res.json(fuel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar los combustibles' });
    }
}

const getFuel = async (req, res) => {
    try {
        const fuel = await prisma.fuel.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                truck: true,
            },
        });
        res.json(fuel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el combustible' });
    }
}

const editFuel = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            cost,
            efficiency,
            brand
        } = req.body;

        const fuelExists = await prisma.fuel.findUnique({
            where: {
                id: id
            }
        });

        if (!fuelExists) {
            return res.status(404).json({ error: 'Combustible no encontrado' });
        }

        // editar solo los campos proporcionados
        const fuelEdit = {
            cost: cost || fuelExists.cost,
            efficiency: efficiency || fuelExists.efficiency,
            brand: brand || fuelExists.brand
        }

        const fuel = await prisma.fuel.update({
            where: {
                id: id
            },
            data: fuelEdit
        });

        res.json(fuel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al editar el combustible' });
    }
}

const deleteFuel = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.truck.updateMany({
            where: {
                fuelId: id
            },
            data: {
                fuelId: null
            }
        });

        await prisma.fuel.delete({
            where: {
                id: id
            }
        });
        res.json({ message: 'Combustible eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el combustible' });
    }
}

module.exports = {
    createFuel,
    listFuel,
    getFuel,
    editFuel,
    deleteFuel
}