import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

const List = () => {
    const dispatch = useDispatch()

    const [users, setUsers] = useState([])
    const [locations, setLocations] = useState()
    const [modalIsOpen, setModalOpen] = useState(false)

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        try {
            dispatch({ type: 'LOADING', payload: true })
            const res = await axios.get('http://localhost:8000/api/get')
            setUsers(res.data.users)
        } catch (err) {
            console.log(err)
        } finally {
            dispatch({ type: 'LOADING', payload: false })
        }
    }

    const deleteItem = (id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you going to delete really?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    dispatch({ type: 'LOADING', payload: true })
                    const res = await axios.get(`http://localhost:8000/api/delete/${id}`)
                    dispatch({ type: 'STATUS_SUCCESS', payload: res.data.message })
                    initialize()
                } catch (err) {
                    console.log(err)
                    dispatch({ type: 'STATUS_ERROR', payload: err.response.data.message })
                } finally {
                    dispatch({ type: 'LOADING', payload: false })
                }
            } 
        })
    }

    const showAddress = async (locations) => {
        try {
            setLocations(locations ? JSON.parse(locations) : [])
            setModalOpen(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className='navbar navbar-success bg-success px-5 py-3'>
                <span className='navbar-brand mb-0 h1 text-white'>Powerline</span>
                <Link to="/create" className="btn btn-light text-success">Create</Link>
            </div>

            <div className='container'>
                <table className='table table-striped mt-5'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>First Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.length > 0 && users.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{ item.firstname }</td>
                                    <td>{ item.lastname }</td>
                                    <td>{ item.email }</td>
                                    <td>{ item.phone }</td>
                                    <td>
                                        <Link className='btn btn-warning' to={`/edit/${item.id}`}>Edit</Link>
                                        <button className='btn btn-danger mx-1' onClick={() => deleteItem(item.id)}>Delete</button>
                                        <button className='btn btn-info' onClick={() => showAddress(item.locations)}>Address</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => setModalOpen(false)}
            >
                <div>
                    <h3 className='text-center mb-2'>Location Details</h3>
                    {
                        locations && locations.length > 0 && locations.map((item, index) => (
                            <li key={index}>{`${item.address}, ${item.city}, ${item.state}, ${item.zip}`}</li>
                        ))
                    }
                </div>
            </Modal>
        </div>
    )
}

export default List