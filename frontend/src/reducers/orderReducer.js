import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_RESET,

    ORDER_LISTS_REQUEST, 
    ORDER_LISTS_SUCCESS,
    ORDER_LISTS_FAIL,
    ORDER_LISTS_RESET
} from '../constants/orderConstants'


export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
                order: {}
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case ORDER_DETAILS_RESET:
            return{
                order:[]
            }

        default:
            return state
    }
}

export const orderListsReducer = (state = { orders:[]}, action) =>{
    switch(action.type){
        case ORDER_LISTS_REQUEST:
            return {
                loading:true
            }
        case ORDER_LISTS_SUCCESS:
            return {
                loading:false,
                orders: action.payload
            }
        case ORDER_LISTS_FAIL:
            return {
                loading:false,
                error: action.payload
            }

        case ORDER_LISTS_RESET:
            return {
                orders:[]
            }

        default:
            return state
    }
}