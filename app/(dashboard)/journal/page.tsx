import React from 'react';
import { prisma } from '@/utils/db';
import { getUserByClerkId } from '@/utils/auth';
import NewEntryCard from '@/components/NewEntryCard';
import EntryCard from '@/components/EntryCard';
import Link from "next/link";
import {analyze} from "@/utils/ai";
import Question from "@/components/Question";

const getEntries = async () => {
  const user = await getUserByClerkId();
  return prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-4xl mb-12">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
      <NewEntryCard />
      {entries.map((entry) => (
        <Link href={`/journal/${entry.id}`} key={entry.id}>
          <EntryCard entry={entry} />
        </Link>
      ))}
    </div>
      </div>
  );
};

export default JournalPage;
