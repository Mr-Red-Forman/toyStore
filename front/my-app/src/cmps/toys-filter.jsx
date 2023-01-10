import { useEffect, useRef, useState } from "react"

import { toyService } from "../services/toyService";
import { utilService } from "../services/util.service.js"

export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        {
            setFilterByToEdit((prevFilter) => {
                if (field === "label") {
                    return ({ ...prevFilter, labels: [...prevFilter.labels, value] })
                } else { return ({ ...prevFilter, [field]: value }) }
            }
            )
        }
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function onRemoveLabel (label){
        setFilterByToEdit((prevFilter)=>{
            let labels=[...prevFilter.labels]
            const returnLabels=labels.filter(l=>l!==label)
            return ({ ...prevFilter, labels: returnLabels })
        }
        )
    }

    return <section className="toy-filter full main-layout">
        <h2>Toys Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="toy">Toy:</label>
            <input type="text"
                id="toy"
                name="txt"
                placeholder="By toy"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
                autoCorrect="off"
                autoComplete="off"
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="range"
                id="maxPrice"
                name="price"
                max="100"
                min="0"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />
            <input list="browsers" name="label" placeholder="Choose label" value="" onChange={handleChange} />
            <datalist id="browsers">
                {labels.map(label => {
                    if (filterByToEdit.labels.includes(label)) return
                    return <option key={label} value={label} />
                })}
            </datalist>

            <ul>
            
            {filterByToEdit.labels.map(label=>{
                
               return <li key={label}>
                     <h1>{label}<span onClick={()=>onRemoveLabel(label)}>X</span></h1>
                </li>
            })}
            </ul>


            <button hidden>Filter</button>
        </form>

    </section>


}