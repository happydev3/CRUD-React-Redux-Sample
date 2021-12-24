import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams  } from 'react-router-dom'
import { Locations } from '../components'

const Form = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const [user, setUser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        locations: [],
    })

    useEffect(() => {
        if (params.id) {
            getInfo(params.id)
        }
    }, [params])

    const getInfo = async (id) => {
        try {
            dispatch({ type: 'LOADING', payload: true })
            const res = await axios.get(`http://localhost:8000/api/edit/${id}`)
            setUser({
                ...res.data.user,
                locations: res.data.user.locations ? JSON.parse(res.data.user.locations) : []
            })
        } catch (err) {
            console.log(err)
            dispatch({ type: 'STATUS_ERROR', payload: err.response.data.message })
        } finally {
            dispatch({ type: 'LOADING', payload: false })
        }
    }

    const addLocation = () => {
        setUser((prev) => ({
            ...prev,
            locations: [
                ...prev.locations,
                {
                    address: '',
                    city: '',
                    state: '',
                    zip: ''
                }
            ]
        }))
    }

    const onValueChange = (field, value) => {
        setUser((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const setLocationValue = (index, field, value) => {
        let tmp = [...user.locations]
        tmp[index][field] = value
        setUser((prev) => ({
            ...prev,
            locations: tmp
        }))
    }
    
    const removeItem = (index) => {
        let tmp = [...user.locations]
        tmp.splice(index, 1)
        setUser({
            ...user,
            locations: tmp
        })
    }

    const submit = async () => {
        try {
            dispatch({ type: 'LOADING', payload: true })
            user.locations = JSON.stringify(user.locations)
            const res = await axios.post(`http://localhost:8000/api/${params.id ? 'update' : 'create'}`, user)
            dispatch({ type: 'STATUS_SUCCESS', payload: res.data.message })
            navigate('/')
        } catch (err) {
            console.log(err.response.data.message)
            dispatch({ type: 'STATUS_ERROR', payload: err.response.data.message })
        } finally {
            dispatch({ type: 'LOADING', payload: false })
        }
    }

    return (
        <div>
            <div className='navbar navbar-success bg-success px-5 py-3'>
                <Link to="/" className="btn btn-outline-white">Back</Link>
            </div>

            <div className='container mt-5'>
                <div className='d-flex flex-row flex-wrap'>
                    <div className="form-group col-md-6 py-3 px-1">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            value={user.email}
                            onChange={(ev) => onValueChange('email', ev.target.value)} 
                        />
                    </div>
                    <div className="form-group col-md-6 py-3 px-1">
                        <label htmlFor="firstname">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            placeholder="Firstname"
                            value={user.firstname}
                            onChange={(ev) => onValueChange('firstname', ev.target.value)} 
                        />
                    </div>
                    <div className="form-group col-md-6 py-3 px-1">
                        <label htmlFor="lastname">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            placeholder="Lastname"
                            value={user.lastname}
                            onChange={(ev) => onValueChange('lastname', ev.target.value)} 
                        />
                    </div>
                    <div className="form-group col-md-6 py-3 px-1">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Phone"
                            value={user.phone}
                            onChange={(ev) => onValueChange('phone', ev.target.value)} 
                        />
                    </div>

                    <button className='btn btn-danger' onClick={() => addLocation()}>+ Location</button>
                    <div className='form-group col-md-12 py-3 px-1'>
                        {
                            user.locations && user.locations.length > 0 && user.locations.map((item, index) => (
                                <Locations
                                    key={index} 
                                    item={item}
                                    index={index}
                                    removeItem={() => removeItem(index)}
                                    onValueChange={(field, value) => setLocationValue(index, field, value)}
                                />
                            ))
                        }
                    </div>
                
                    <div className="form-group col-md-6 py-3 px-1">
                        <button 
                            type="submit" 
                            className="btn btn-success"
                            onClick={submit}
                        >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form