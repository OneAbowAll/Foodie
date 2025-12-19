import { useRef } from "react";

export function StringList({list, onAdd, onDelete, multiline = false}:{list: string[], onAdd: (newIngredient:string)=>void, onDelete: (id: number)=>void, multiline?: boolean})
{
    const input = useRef<HTMLInputElement>(null);
    const multilineInput = useRef<HTMLTextAreaElement>(null);

    const addElement = () =>{
        
        const newName = (multiline)? multilineInput.current!.value:input.current!.value;
        if(newName.trim() !== "")
            onAdd(newName);
            
        input.current!.value = "";
    };

    const deleteElement = (id:number)=>{
        onDelete(id);
    };
    
    return <div>
        <span>
        {
            multiline
            ?<textarea id="newElement" ref={multilineInput} rows={5}  cols={50} ></textarea>
            :<input type="text" id="newElement" ref={input}></input>
        }<button onClick={() => { addElement(); } }>+</button>
        </span>
        <br/>
        <span>
            <ol>
            {list.map((value, index) =>
                            <li>
                            <IngredientItem
                                id={index}
                                name={value}
                                onDelete={deleteElement}/>
                            </li>
                        )
            }
            </ol>
        </span>
    </div>
}

function IngredientItem({id, name, onDelete} : {id: number, name: string, onDelete: (itemId: number)=>void}){
    return <>
    <span>
        {name}
    </span>
    <button onClick={()=>onDelete(id)}>&times;</button>
    <br/>
    </>;
}