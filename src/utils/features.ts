import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateOptions = (meaning:{
    Text:string
}[],index:number): string[]=>{

const correctAns:string = meaning[index].Text
const exceptCorrect = meaning.filter(i=>i.Text!==correctAns)
const incorrectOptions:string[] = _.sampleSize(exceptCorrect,3).map((i)=>i.Text)

const mcqOptions = _.shuffle([...incorrectOptions,correctAns])
    return mcqOptions
}

export const translateWords = async(params:LangType):Promise<WordType[]> =>{
    try {
        const words = (generate(8) as string[]).map((i) => ({
            Text: i
        }));

        const response=await axios.post('https://microsoft-translator-text.p.rapidapi.com/translate',words,{
            params: {
                'to[0]': params,
                'api-version': '3.0',
                profanityAction: 'NoAction',
                textType: 'plain'
              },
              headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'a218ab7afcmsh31bf0fb0fa5b711p1236e1jsnb62717a2ac9b',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
              },
        })
        const received:FetchedDataType[] = response.data
        const arr:WordType[] = received.map((i,index)=>{

            const options:string[]=generateOptions(words, index)

            return{
                word:i.translations[0].text,
                meaning:words[index].Text,
                options
            }
        })
      
        return arr
        
    } catch (error) {
        console.log(error)
        throw new Error("error")
    }
}

export const countMatchingElements = (arr1:string[],arr2:string[]):number =>{
    if(arr1.length!==arr2.length) throw new Error("Arrays not equal")

    let matchingCount = 0
    for (let index = 0; index < arr1.length; index++) {
       if(arr1[index]===arr2[index]) matchingCount++
    }

    return matchingCount
}