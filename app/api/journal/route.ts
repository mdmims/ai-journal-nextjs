import {getUserByClerkId} from "@/utils/auth";
import {prisma} from "@/utils/db";
import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";
import {analyze} from "@/utils/ai";

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!'
  }
  })

  // analyze content through LLM API
  const analysis = await analyze(entry.content)
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis
    }
  })

  revalidatePath('/journal')

  return NextResponse.json({data: entry})
}

export const GET = async () => {
  const entries = await prisma.journalEntry.findMany()
  return NextResponse.json({data: entries})
}