/*
 * Imports dictionaryAPI functions
 */
import {
  getWordData,
  getWordDefinition,
  getRandomWord,
  getAudioUrl,
} from "@/utils/dictionaryAPI";
import { NextResponse } from "next/server";

/* The word request thing */
export const GET = async (request, { params }) => {
  const word = params.word;
  const wordData = await getWordData(word, "collegiate");
  const definition = getWordDefinition(wordData);
  const audioUrl = getAudioUrl(wordData);
  return NextResponse.json({
    word: word,
    definition: definition,
    audioUrl: audioUrl,
  });
};
