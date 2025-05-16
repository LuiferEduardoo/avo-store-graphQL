import { Avocado, Attributes, PrismaClient, Prisma } from "@prisma/client";

type ResolverContext = {
  orm: PrismaClient;
};

export function findAll(
  parent: unknown,
  arg: { skip?: number; take?: number; where: Prisma.AvocadoWhereInput },
  context: ResolverContext
): Promise<Avocado[]> {
  return context.orm.avocado.findMany({
    include: { attributes: true },
    skip: arg.skip,
    take: arg.take,
    where: arg.where,
  });
}

export function finOne(
  parent: unknown,
  { id }: { id: string },
  context: ResolverContext
): Promise<Avocado | null> {
  return context.orm.avocado.findUnique({
    where: { id: parseInt(id, 10) },
    include: { attributes: true },
  });
}

export async function create(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Avocado, "name" | "price" | "image" | "sku"> & Attributes;
  },
  { orm }: ResolverContext
): Promise<Avocado> {
  const { name, price, image, sku, ...attributes } = data;
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
  });

  return avo;
}
