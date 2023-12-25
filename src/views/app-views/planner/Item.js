import cl from "./planner.module.css"
import { useDrag } from "react-dnd"
export const Item = ({src,alt,id})=>{
    const [{isDragging}, drag] = useDrag({
        type:"furniture",
        item:{type:"furniture",id:id},
        collect: (monitor)=>({
            isDragging: !!monitor.isDragging()
        })
    })
    return (
        <div className={`${cl.HeaderItem} ${cl[alt]}`} ref={drag} style={isDragging?{border:"1px solid blue"}:{}}>
            <img src={src} alt={alt}/>
        </div>     
    )
}