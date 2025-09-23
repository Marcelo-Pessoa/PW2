import { PrismaClient } from './../src/generated/prisma'
import { UserTypes } from './../src/resources/userType/userType.constants.ts'

const prisma = new PrismaClient()

async function seed() {
  return await prisma.userType.createMany({
    data: [
      { id: UserTypes.admin, label: 'admin' },
      { name: UserTypes.client, label: 'client' },
    ], skipDuplicates: true
  })
}

seed()
  .then( () => {
    console.log("REgistros Adicionados")
  })
  .catch( (e) => {
    console.error(e)
  })
  .finally()