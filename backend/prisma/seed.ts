import { PrismaClient } from './../src/generated/prisma'
import { UserTypes } from './../src/resources/userType/userType.constants'

const prisma = new PrismaClient()

async function seed() {
  return await prisma.userType.createMany({
    data: [
      { id: UserTypes.admin, label: 'admin' },
      { id: UserTypes.client, label: 'client' },
    ], skipDuplicates: true
  })
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Registros Adicionados")
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
  })
  .finally()