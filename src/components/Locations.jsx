import React from 'react'

export default ({ item, index, removeItem, onValueChange }) => {
    return (
        <div className="d-flex flex-row">
            <div className="form-group col-md-5 p-1">
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    value={item.address}
                    onChange={(ev) => onValueChange('address', ev.target.value)}
                />
            </div>
            <div className="form-group col-md-3 p-1">
                <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="City"
                    value={item.city}
                    onChange={(ev) => onValueChange('city', ev.target.value)}
                />
            </div>
            <div className="form-group col-md-2 p-1">
                <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="State"
                    value={item.state}
                    onChange={(ev) => onValueChange('state', ev.target.value)}
                />
            </div>
            <div className="form-group col-md-2 p-1">
                <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder="Zip"
                    value={item.zip}
                    onChange={(ev) => onValueChange('zip', ev.target.value)}
                />
            </div>
            <button className='btn btn-danger m-1' onClick={() => removeItem(index)}>*</button>
        </div>
    )
}