import { getWordDefAndAudio } from "@/utils/dictionaryAPI";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const word = params.word;
  const wordData = await getWordDefAndAudio(word);
  return NextResponse.json(wordData);
};
