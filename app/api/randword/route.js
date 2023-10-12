import { getRandomWord, getWordDefAndAudio } from "@/utils/dictionaryAPI";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const word = getRandomWord();
  const wordData = await getWordDefAndAudio(word);
  return NextResponse.json(wordData);
};
