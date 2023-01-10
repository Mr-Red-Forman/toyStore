
import { toyService } from "../services/toyService"
import { showErrorMsg } from "../services/event-bus.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>Toy: {toy.toy}</h1>
        <h5>Price: ${toy.price}</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <h1>{toy.labels.join(' ')}</h1>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
        <Link to={`/toy`}>Back</Link>
    </section>
}