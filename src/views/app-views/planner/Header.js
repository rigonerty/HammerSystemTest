import { Item } from "./Item"
import cl from "./planner.module.css"

export const Header = ({imgs})=>{

    return (
        
        <div className={cl.Header}>
                    {imgs.map((a,i)=>{
                        return (
                                <Item alt={a.alt} src={a.src} id={i}/>
                                )
                            }
                    )}                           
        </div>
    )
}