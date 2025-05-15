import { Avocado, Attributes, PrismaClient } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient
}

export function findAll(parent: unknown, arg: unknown, context: ResolverContext): Promise<Avocado[]> {
  return context.orm.avocado.findMany()
}

export async function create(parent: unknown, {
    data,
  }: {
    data: Pick<Avocado, 'name' | 'price' | 'image' | 'sku'> &
      Attributes
  },
  { orm }: ResolverContext): Promise<Avocado> {
    const { name, price, image, sku, ...attributes } = data
    const avo = await orm.avocado.create({
    data: {
      name,
      price,
      image,
      sku,
      attributes: {
        create: attributes,
      },
    },
    include: { attributes: true },
  })

  return avo
}