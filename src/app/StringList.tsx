import { useRef, useState } from "react";

export function StringList({list, onAdd, onUpdate, onDelete, multiline = false}:{list: string[], onAdd: (newIngredient:string)=>void, onUpdate: (id: number, newValue: string)=>void, onDelete: (id: number)=>void, multiline?: boolean})
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
    
    return <div className="method-div">
        <div className="method-input-div">
            {
                multiline
                ? <textarea id="newElement" ref={multilineInput} rows={10}  cols={80} onKeyUp={onKeyUp}></textarea>
                : <input type="text" id="newElement" ref={input} onKeyUp={onKeyUp}></input>
            }
            <button onClick={() => addElement()}>+</button>
        </div>

        <span>
            <ol id="stringlist-list">
            {
                list.map((value, index) =>
                            <li key={index} id="stringlist-element">
                            <IngredientItem
                                id={index}
                                name={value}
                                updateItem={onUpdate}
                                onDelete={onDelete}
                                multiline={multiline}/>
                            </li>
                        )
            }
            </ol>
        </span>

    </div>
}

function IngredientItem({id, name, onDelete, updateItem, multiline = false} : {id: number, name: string, onDelete: (itemId: number)=>void, updateItem: (itemId:number, newValue: string)=>void, multiline?: boolean})
{
    const [editMode, setEditMode] = useState<boolean>(false);

    const editInput = useRef<HTMLInputElement>(null);
    const editMultilineInput = useRef<HTMLTextAreaElement>(null);

    const toggleEdit = ()=>{
        if(!editMode)
            setEditMode(true);
        else
        {
            setEditMode(false);
            const newName = (multiline)? editMultilineInput.current!.value:editInput.current!.value;
            updateItem(id, newName);
        }
    }

    return (
    <span className="stringlist-element-content">
        {
            !editMode
            ? <span>{name}</span>
            : multiline
                ? <textarea id="newElement" ref={editMultilineInput} rows={10}  cols={80} defaultValue={name}></textarea>
                : <input ref={editInput} id="newElement" defaultValue={name} />
        }
        <button onClick={() => {toggleEdit()}}>{ editMode? "✅" : "✏️" }</button>
        <button onClick={()=>onDelete(id)}>&times;</button>
        <br/>
    </span>
    );
}