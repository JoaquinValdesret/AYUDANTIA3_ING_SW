import { Router } from 'express';
import { getProductReviews, createProductReview } from '../controllers/review.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { productIdParamSchema } from '../schemas/product.schema.js';
import { createReviewSchema } from '../schemas/review.schema.js';

const router = Router();

router.get('/:id/reviews', validate(productIdParamSchema, 'params'), getProductReviews);
router.post('/:id/reviews', validate(productIdParamSchema, 'params'), validate(createReviewSchema, 'body'), createProductReview);

export default router;
