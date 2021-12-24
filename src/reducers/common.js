import {
    STATUS_ERROR,
    STATUS_SUCCESS,
    LOADING,
} from '../utils/types'

const initialState = {
    status: true,
    message: '',
    loading: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type)
    {
        case STATUS_ERROR:
            return {
                ...state,
                status: false,
                message: payload,
            }
        case STATUS_SUCCESS:
            return {
                ...state,
                status: true,
                message: payload,
            }
        case LOADING:
            return {
                ...state,
                loading: payload,
            }
        default:
            return state
    }
 }
