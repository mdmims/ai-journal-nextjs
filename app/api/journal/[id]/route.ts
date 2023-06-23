import {getUserByClerkId} from "@/utils/auth";
import {prisma} from "@/utils/db";
import {NextResponse} from "next/server";
import entry from "next/dist/server/typescript/rules/entry";
import {analyze} from "@/utils/ai";
import {revalidatePath} from "next/cache";

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      }
    },
    data: {
      content: content
    }
  })

  // update or create analysis based on recent update
  const analysis = await analyze(updatedEntry.content)
  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...analysis
    },
    update: analysis
  })

  return NextResponse.json({ data: {...updatedEntry, analysis: updatedAnalysis}})
}