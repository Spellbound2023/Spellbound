import { getRandomWord, getWordDefAndAudio } from "@/utils/dictionaryAPI";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const word = await getRandomWord();
  const wordData = await getWordDefAndAudio(word);
  return NextResponse.json(wordData);
};
