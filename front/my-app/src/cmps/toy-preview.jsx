import { NavLink } from "react-router-dom"

export function ToyPreview({ toy }) {
    return (

        <article>
            <h4>{toy.toy}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>  */}
             <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
            <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>

        </article>
    )
}