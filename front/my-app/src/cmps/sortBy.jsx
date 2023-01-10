import { useSelector } from "react-redux"


export function SortBy({sort:sortBy, onSetSort}){

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        if (type==="checkbox"){sortBy[field]=sortBy[field]*-1}
        if (type==="select-one"){sortBy[field]=value}
        onSetSort({...sortBy})
    }


    return (
        <>
            <select value={sortBy.by} onChange={handleChange} name="by">
                <option value="toy">Toy</option>
                <option value="price">price</option>
                <option value="stock">Stock</option>
                <option value="createdAt">Date</option>
            </select>
            <div>
                <input id="descending" type="checkbox" checked={sortBy.descending!==1? true: false} name="descending" onChange={handleChange}/>
                <label htmlFor="descending">Descending</label>
            </div>

        </>
    )

}