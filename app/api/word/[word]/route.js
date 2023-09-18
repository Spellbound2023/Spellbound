import { getWordDefAndAudio } from "@/utils/dictionaryAPI";
import { NextResponse } from "next/server";

/* The word request thing */
export const GET = async (request, { params }) => {
  const word = params.word;
  const wordData = await getWordDefAndAudio(word);
  return NextResponse.json(wordData);
};
