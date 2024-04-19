import prismaClient from "../services/prisma";

export async function verifyExistUser(userId: string) {
  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
}
