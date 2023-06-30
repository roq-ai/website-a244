import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { cartValidationSchema } from 'validationSchema/carts';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCarts();
    case 'POST':
      return createCart();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCarts() {
    const data = await prisma.cart
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'cart'));
    return res.status(200).json(data);
  }

  async function createCart() {
    await cartValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.cart_item?.length > 0) {
      const create_cart_item = body.cart_item;
      body.cart_item = {
        create: create_cart_item,
      };
    } else {
      delete body.cart_item;
    }
    const data = await prisma.cart.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
