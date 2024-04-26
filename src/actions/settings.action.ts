"use server";

//import { auth } from "@/auth";
import { prisma, getSession } from "@/lib";
import { UpdateProfileValues, updateProfileSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
export async function updateProfile(values: UpdateProfileValues) {
  //const session = await auth();
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw Error("Unauthorized");
  }

  const { name } = updateProfileSchema.parse(values);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });

  revalidatePath("/");
}
