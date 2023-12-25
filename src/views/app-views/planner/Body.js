import React, {useState,useRef} from "react"
import cl from "./planner.module.css"
import { useDrop } from "react-dnd"
import {RedoOutlined,CloudDownloadOutlined,CloudUploadOutlined,CloseOutlined,DeleteOutlined } from '@ant-design/icons';
export const Body = ({furniture, dropItem,setFurniture})=>{
    const uploadRef = useRef(null)
    const [isDrag,setDrag] = useState(false)
    const [isPosition, setPosition] = useState({startX:0,startY:0})
    const [isLeft,setLeft] = useState(0)
    const [isTop,setTop] = useState(0)
    const [isMove,setMove] = useState(false)
    const [isSelected, setSelected] = useState(null)
    const [{isOver},drop] = useDrop({
        accept:"furniture",
        drop:(item,monitor)=> dropItem(item,monitor),
        collect: (monitor)=>({
            isOver: !!monitor.isOver()
        })
    })

    const moveImageHandler = (e)=>{
        e.preventDefault()
        if(isDrag && !isMove){
            const newLeft = isLeft + (e.clientX - isPosition.startX)
            const newTop = isTop + (e.clientY-isPosition.startY)
            const parentWidth = document.querySelector(`.${cl.Body}`)?.getBoundingClientRect().width||0
            const parentHeight = document.querySelector(`.${cl.Body}`)?.getBoundingClientRect().height||0
            const imgWidth = document.querySelector(`.${cl.PlannerZone}`)?.getBoundingClientRect().width||0
            const imgHeight = document.querySelector(`.${cl.PlannerZone}`)?.getBoundingClientRect().height||0
            setLeft(newLeft<0&&(Math.abs(newLeft-parentWidth)<Math.floor(imgWidth))?newLeft:isLeft)
            setTop(newTop<0&&(Math.abs(newTop-parentHeight)<Math.floor(imgHeight))?newTop:isTop)
            setPosition({startX:e.clientX,startY:e.clientY})
        }
    }
    const moveItem = (e,id)=>{
        if(isMove && typeof id === "number" ){
            const leftEl = document.querySelector(`.${cl.PlannerZone}`)?.getBoundingClientRect().left||0
            const topEl = document.querySelector(`.${cl.PlannerZone}`)?.getBoundingClientRect().top||0
            const item = document.querySelector(`.itemFurn_${id}`)?.getBoundingClientRect() || {width:0,height:0}
            const x = Math.abs(Math.floor((leftEl - e.clientX)))
            const y = Math.abs(Math.floor((topEl-e.clientY)))
            setFurniture(prev=>{
                prev[id].position = [x-item.width/2,y-item.height/2] 
                return [...prev]
            })
        }
    }
    const rotateItem=()=>{
        if(isSelected){
            setFurniture(prev=>{
                return prev.map((a,i)=>{
                    if(isSelected.index===i){
                        a.rotate += 45
                        return {...a} 
                    }
                    return {...a}
                })
            })
        }
    }
    const deleteItem=()=>{
        if(isSelected){
            setFurniture(furniture.filter((a,i)=>i!==isSelected.index))
        }
    }
    const upload = (e)=>{
      const file = e.target?.files?.[0]
      if(file){
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = ()=>{
            const json = JSON.parse(reader.result)
            if(json?.length>0 && json[0]?.alt){
                setFurniture(json)
            }
        }
      }
    }
    return (
        <div>
            <div className={cl.ChangeItem}>
                <button onClick={rotateItem}>
                    <RedoOutlined style={{fontSize:"1.6em"}}/>
                </button>
                <button onClick={deleteItem}>
                        <DeleteOutlined style={{fontSize:"1.6em", color:'red'}}/>
                </button>
                <button onClick={()=>setSelected(null)}>
                    <CloseOutlined style={{fontSize:"1.6em", color:'red'}}/>
                </button>
                <button>
                    <a
                        href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(furniture)
                        )}`}
                        download="furniture.json"
                    >
                        <CloudDownloadOutlined style={{fontSize:"1.6em"}}/>
                    </a>
                    
                </button>
                <button onClick={()=>uploadRef?.current?.click()}>
                    <input type="file" accept=".json" onChange={upload} style={{display:"none"}} ref={uploadRef}/>
                    <CloudUploadOutlined style={{fontSize:"1.6em"}}/>
                </button>
                <p>Double click to select item</p>
            </div>
            <div className={cl.Body}
                onMouseDown={(e)=>{ setPosition({startX:e.clientX,startY:e.clientY});setDrag(true)}} 
                onMouseOut={()=>{setDrag(false)}} 
                onMouseUp={(e)=>{setDrag(false) }}
                onMouseMove={(e)=>{moveImageHandler(e); moveItem(e,isSelected?.index)}}>
                        <div 
                            style={{top:isTop,left:isLeft}}
                            className={cl.PlannerZone}
                            ref={drop}>
                            {furniture.map((a,i)=>{
                                return (
                                        <div 
                                        className={`${cl.HeaderItem} ${cl[a.alt]} ${"itemFurn_"+i} ${isSelected?.index===i?cl.active:""}`} 
                                        style={
                                            {top:a.position[1],left:a.position[0], transform:`rotate(${a.rotate}deg)`}
                                            } 
                                        onMouseDown={()=>{setMove(true); setSelected({...a, index:i})}} 
                                        onMouseUp={()=>{setMove(false);setSelected(null)}}
                                        onDoubleClick={()=>setSelected({...a, index:i})}>
                                            <img src={a.src} alt={a.alt}/>
                                        </div>                        
                                        )
                                        }

                            )}
                        </div>                     

            </div>
        </div>

    )
}