import {auth} from "@clerk/nextjs";
import {prisma} from "@/utils/db";

export const getUserByClerkId = async () => {
  const {userId} = await auth()
  return prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId
    }
  });
}