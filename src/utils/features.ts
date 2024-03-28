import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateOptions = (
  meaning: {
    Text: string;
  }[],
  index: number
): string[] => {
  const correctAns: string = meaning[index].Text;
  const exceptCorrect = meaning.filter((i) => i.Text !== correctAns);
  const incorrectOptions: string[] = _.sampleSize(exceptCorrect, 3).map(
    (i) => i.Text
  );

  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);
  return mcqOptions;
};

export const translateWords = async (params: LangType): Promise<WordType[]> => {
  try {
    const words = (generate(10) as string[]).map((i) => ({
      Text: i,
    }));

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "a218ab7afcmsh31bf0fb0fa5b711p1236e1jsnb62717a2ac9b",
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    const received: FetchedDataType[] = response.data;
    const arr: WordType[] = received.map((i, index) => {
      const options: string[] = generateOptions(words, index);

      return {
        word: i.translations[0].text,
        meaning: words[index].Text,
        options,
      };
    });

    return arr;
  } catch (error) {
    console.log(error);
    throw new Error("error");
  }
};

export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) throw new Error("Arrays not equal");

  let matchingCount = 0;
  for (let index = 0; index < arr1.length; index++) {
    if (arr1[index] === arr2[index]) matchingCount++;
  }

  return matchingCount;
};

export const fetchAudio = async (
    text: string,
    language: LangType
  ): Promise<string> => {
    const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;
    const rapidKey = import.meta.env.VITE_RAPID_API;
  
    const encodedParams = new URLSearchParams({
      src: text,
      r: "0",
      c: "mp3",
      f: "8khz_8bit_mono",
      b64: "true",
    });
  
    if (language === "ja") encodedParams.set("hl", "ja-jp");
    else if (language === "es") encodedParams.set("hl", "es-es");
    else if (language === "fr") encodedParams.set("hl", "fr-fr");
    else encodedParams.set("hl", "hi-in");
  
    const { data }: { data: string } = await axios.post(
      "https://voicerss-text-to-speech.p.rapidapi.com/",
      encodedParams,
      {
        params: { key },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": rapidKey,
          "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
        },
      }
    );
  
    return data;
  };