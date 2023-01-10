import PropTypes from 'prop-types';
import { ToyPreview } from './toy-preview';

// toys={toys}
// onRemoveToy={onRemoveToy}
// onEditToy={onEditToy}

export function ToyList({ toys, onRemoveToy, onEditToy, addToToyt }) {
    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />

                <div>
                    <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                    <button onClick={() => { onEditToy(toy) }}>Change price</button>
                </div>

                {/* <button className="buy" onClick={() => { addToToyt(toy) }}>
                    Add to Toyt
                </button> */}
            </li>
            )}
    </ul>
}