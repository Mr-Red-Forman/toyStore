

import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toyService"



export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()
    const elInputRef = useRef(null)

    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]


    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        {
            setToyToEdit((prevFilter) => {
                if (field === "label") {
                    return ({ ...prevFilter, labels: [...prevFilter.labels, value] })
                } else { return ({ ...prevFilter, [field]: value }) }
            }
            )
        }
    }

    function onRemoveLabel (label){
        setToyToEdit((prevFilter)=>{
            let labels=[...prevFilter.labels]
            const returnLabels=labels.filter(l=>l!==label)
            return ({ ...prevFilter, labels: returnLabels })
        }
        )
    }
    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    return <section className="toy-edit">
        <h2>{toyToEdit.id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
        <label htmlFor="toy">Toy:</label>
            <input type="text"
                id="toy"
                name="txt"
                placeholder="By toy"
                value={toyToEdit.toy}
                onChange={handleChange}
                ref={elInputRef}
                autoCorrect="off"
                autoComplete="off"
            />
            <label htmlFor="price">Price : </label>
            <input type="range"
                id="price"
                name="price"
                max="100"
                min="0"
                placeholder="price"
                value={toyToEdit.price}
                onChange={handleChange}
            />

            <input list="browsers" name="label" placeholder="Choose label" value="" onChange={handleChange} />
            <datalist id="browsers">
                {labels.map(label => {
                    if (toyToEdit.labels.includes(label)) return
                    return <option key={label} value={label} />
                })}
            </datalist>

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}