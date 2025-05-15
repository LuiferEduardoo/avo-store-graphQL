import type { Avocado } from '@prisma/client'
import * as avo from './avocado.resolver';
import * as scalars from '../modules/base/scalars.model';


export default {
  ...scalars,
  BaseModel: {
    __resolveType: (parent: Avocado) => {
      if (parent.name) {
        return 'Avocado'
      }
      return null // No more implementations
    },
  },
  Query: {
    avos: avo.findAll,
    avo: avo.finOne,
  },
  Mutation: {
    createAvo: avo.create,
  }
}