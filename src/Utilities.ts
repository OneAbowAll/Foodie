import type { Recipe } from "./data/Recipe";

function FindAndRankAll(from:Recipe[], titleToMatch:string, filter: ((rank: number)=>boolean) = ()=>true): Recipe[]
{
    const result: [Recipe, number][] = [];
    titleToMatch = titleToMatch.toLowerCase();

    for(const element of from)
    {
        const title = element.title;
        let rank = 0;

        let matchIndex = 0;
        for (let i = 0; i < title.length; i++) {
            const c = title[i].toLowerCase();
            
            //Proviamo a fare match anche all'interno della stringa
            if(c !== titleToMatch[matchIndex]) 
                if(matchIndex === 0)
                    continue
                else
                    break; //ma quando iniziamo a fare match ci fermiamo subito se non sono consecutivi i caratteri.s
            
            matchIndex++;
            rank += title.length - i;
        }
        
        rank = rank/title.length
        if(rank > 0 && filter(rank))
            result.push([element, rank]);
    }

    console.log(result);
    return result.sort((a, b)=>b[1]-a[1]).map((res)=>res[0]);
}

export default FindAndRankAll;