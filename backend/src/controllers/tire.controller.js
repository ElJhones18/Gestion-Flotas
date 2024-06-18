const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createTire = async (req, res) => {
    const { brand, wear, truckId } = req.body
    try {

        if (truckId) {
            //validar que el camión exista
            const truckExist = await prisma.truck.findUnique({
                where: {
                    id: truckId
                }
            });
            if (!truckExist) {
                return res.status(400).json({ error: 'El camión no existe' });
            }
        }

        const newTire = await prisma.tires.create({
            data: {
                brand: brand,
                wear: wear,
                truckId: truckId
            }
        })
        res.json(newTire);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el neumático' });
    }
}

const listTire = async (req, res) => {
    try {
        const tire = await prisma.tires.findMany();
        res.json(tire);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar los neumáticos' });
    }
}

const getTire = async (req, res) => {
    try {
        const tire = await prisma.tires.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                truck: true
            }
        });
        res.json(tire);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el neumático' });
    }
}

const editTire = async (req, res) => {
    const { brand, wear, truckId } = req.body;
    try {

        const { id } = req.params;

        const tireExist = await prisma.tires.findUnique({
            where: {
                id: id
            }
        })

        const tireEdit = {
            brand: brand || tireExist.brand,
            wear: wear || tireExist.wear,
            truckId: truckId || tireExist.truckId
        }

        const tire = await prisma.tires.update({
            where: {
                id: req.params.id
            },
            data: tireEdit
        });

        res.json(tire);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el neumático' });
    }
}

const deleteTire = async (req, res) => {
    try {
        const { id } = req.params;
        const tire = await prisma.tires.delete({
            where: {
                id: id
            }
        });
        res.json({ message: 'Neumático eliminado' });``
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el neumático' });
    }
}

module.exports = {
    createTire,
    listTire,
    getTire,
    editTire,
    deleteTire
}