import { getRandomWord, getWordDefAndAudio } from "@/utils/dictionaryAPI";
import { NextResponse } from "next/server";

/* GET request */
export const GET = async (request) => {
  // Asynchronously fetches random word 
  const word = await getRandomWord();
  // Asynchronously fetches definition and audio for word 
  const wordData = await getWordDefAndAudio(word);
  return NextResponse.json(wordData);
};
