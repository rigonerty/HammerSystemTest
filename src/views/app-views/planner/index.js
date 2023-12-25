import {useState} from "react"
import {Header} from "./Header"
import {Body} from "./Body"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import cl from "./planner.module.css"
const Planner = ()=>{
    const imgs = [
        {src:'/img/furniture/Bed.jpg', alt:"bed",},
        {src:'/img/furniture/SecondBed.jpg', alt:"second_bed",},
        {src:'/img/furniture/BedSideTable.jpg', alt:"bedside_table",},
        {src:'/img/furniture/chair.jpg', alt:"chair",},
        {src:'/img/furniture/Door.jpg', alt:"door",},
        {src:'/img/furniture/Plant.jpg', alt:"plant",},
        {src:'/img/furniture/Sofa.jpg', alt:"sofa",},
        {src:'/img/furniture/Wall.jpg', alt:"wall",},
        {src:'/img/furniture/Wall.jpg', alt:"miniWall",},
    ]
    const [isFurniture,setFurniture] = useState([])
    const onDragEnd = (item,monitor)=>{
        const leftEl = document.querySelector(`.${cl.PlannerZone}`)?.getBoundingClientRect().left||0
        const topEl = document.querySelector(`.${cl.PlannerZone}`)?.getBoundingClientRect().top||0
        const x = Math.abs(Math.floor((leftEl - monitor.getClientOffset().x)))
        const y = Math.abs(Math.floor((topEl-monitor.getClientOffset().y)))
        setFurniture(prev=>[...prev, {...imgs[item.id], position:[x,y], rotate: 0}])
    }
    return(
        <div>
        <DndProvider backend={HTML5Backend}>
            <Header imgs={imgs}/>
            <Body furniture={isFurniture}  dropItem={onDragEnd} setFurniture={setFurniture}/>             
        </DndProvider>
        </div>
    )
}


export default Planner