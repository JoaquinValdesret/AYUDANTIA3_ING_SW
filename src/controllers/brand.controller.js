import prisma from '../config/prisma.js';

export const getAllBrands = async (req, res, next) => {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.status(200).json({
      total: brands.length,
      data: brands
    });
  } catch (error) {
    next(error);
  }
};

export const createBrand = async (req, res, next) => {
  try {
    const brand = await prisma.brand.create({
      data: req.body
    });

    res.status(201).json({
      mensaje: 'Marca creada exitosamente',
      data: brand
    });
  } catch (error) {
    next(error);
  }
};
