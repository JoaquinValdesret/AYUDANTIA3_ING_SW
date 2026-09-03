import prisma from '../config/prisma.js';

export const getProductReviews = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const [reviews, summary] = await Promise.all([
      prisma.review.findMany({
        where: { productId },
        orderBy: { id: 'desc' }
      }),
      prisma.review.aggregate({
        where: { productId },
        _avg: { rating: true },
        _count: { _all: true }
      })
    ]);

    res.status(200).json({
      productId,
      averageRating: summary._avg.rating ?? 0,
      total: summary._count._all,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

export const createProductReview = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const review = await prisma.review.create({
      data: {
        ...req.body,
        productId
      }
    });

    res.status(201).json({
      mensaje: 'Reseña creada exitosamente',
      data: review
    });
  } catch (error) {
    next(error);
  }
};
