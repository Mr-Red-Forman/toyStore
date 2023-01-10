import { func } from "prop-types"
import { NavLink } from "react-router-dom"

export function ToyPreview({ toy }) {
    
    let date= new Date(toy.createdAt)
    let passTime=Date.now()-date
    function timePass(){
        let time=''
        // switch (passTime){
        //     case passTime<10
        //     time=
        // // if passTime<1000*60*60
        // // const minutes=passTime.getMinutes()
        // // const hours=passTime.getHours()
        // // const days=passTime.getDate
        // }

    }
    
   
   
    return (

        <article>
            <h4>{toy.toy}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>createdAt: <span>{passTime}</span></p>


            {/* <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>  */}
             <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
            <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>

        </article>
    )
}