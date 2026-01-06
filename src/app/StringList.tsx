import { useRef } from "react";

export function StringList({list, onAdd, onDelete, multiline = false}:{list: string[], onAdd: (newIngredient:string)=>void, onDelete: (id: number)=>void, multiline?: boolean})
{
    const input = useRef<HTMLInputElement>(null);
    const multilineInput = useRef<HTMLTextAreaElement>(null);

     const onKeyUp = (e: React.KeyboardEvent) => {
        const newName = (multiline)? multilineInput.current!.value:input.current!.value;

        if (newName.trim() === "") {
            return;
        }

        if (e.key === "Enter") {
            addElement();
        }
    }

    const addElement = () =>{
        
        const newName = (multiline)? multilineInput.current!.value:input.current!.value;
        if(newName.trim() !== "")
            onAdd(newName);
            
        if(multiline)
            multilineInput.current!.value=""
        else
            input.current!.value = "";
    };

    const deleteElement = (id:number)=>{
        onDelete(id);
    };
    
    return <div className="method-div">
        <div className="method-input-div">
            {
                multiline
                ?<textarea id="newElement" ref={multilineInput} rows={5}  cols={50} onKeyUp={onKeyUp} ></textarea>
                :<input type="text" id="newElement" ref={input} onKeyUp={onKeyUp}></input>
            }<button onClick={() => { addElement(); } }>+</button>
        </div>
        <span>
            <ol id="stringlist-list">
            {list.map((value, index) =>
                            <li key={index} id="stringlist-element">
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
    return <span className="stringlist-element-content">
    <span>
        {name}
    </span>
    <button onClick={()=>onDelete(id)}>&times;</button>
    <br/>
    </span>;
}