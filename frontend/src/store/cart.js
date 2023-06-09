import csrfFetch from "./csrf";
export const RECEIVE_CART_ITEMS = 'RECEIVE_CART_ITEMS';
export const RECEIVE_CART_ITEM = 'RECEIVE_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const REMOVE_CART_ITEMS ='REMOVE_CART_ITEMS'

const receiveCartItems = (cartItems) => (
    ({
      type: RECEIVE_CART_ITEMS,
      cartItems
    })
);

const receiveCartItem = (cartItems) => (
    ({
      type: RECEIVE_CART_ITEM,
      cartItems
    })
);

const removeCartItem = (cartItemId) => (
    ({
      type: REMOVE_CART_ITEM,
      cartItemId
    })
);

export const removeCartItems = () => (
    ({
        type: REMOVE_CART_ITEMS,
    })
)

export const fetchCartItems = () => async (dispatch) => {
    const response = await fetch('/api/cart_items');

    if (response.ok) {
        const cartItems = await response.json();
        dispatch(receiveCartItems(cartItems));
    };
}; 

export const fetchCartItem = (cartItemId) => async (dispatch) => {
    const response = await fetch(`/api/cart_items/${cartItemId}`);

    if (response.ok) {
        const cartItem = await response.json(); 
        dispatch(receiveCartItem(cartItem));
    };
};
  
export const createCartItem = (cartItem) => async (dispatch) => {
    const response = await csrfFetch(`/api/cart_items`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({cartItem: cartItem})
    });

    if (response.ok) {
        const newCartItem = await response.json();
        dispatch(receiveCartItem(newCartItem));
    };
}; 

export const updateCartItem = (cartItem) => async (dispatch) => {
    const response = await csrfFetch(`/api/cart_items/${cartItem.id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem)
    }); 
    
    if (response.ok) {
        const newCartItem = await response.json();
        dispatch(receiveCartItem(newCartItem));
    };
}; 


export const deleteCartItem = (productId, cartItemId) => (dispatch) => {
    csrfFetch(`/api/cart_items/${cartItemId}`, {
        method: "DELETE",
    })
    .then(() => dispatch(removeCartItem(productId)))
    .catch(error => console.error('Error:', error))
}

export const deleteCartItems = () => (dispatch) => {
    csrfFetch('/api/cart_items/destroy_all', {
        method: "DELETE",
    })
    .then(() => dispatch(removeCartItems()))
    .catch(error => console.error('Error:', error))
}

const cartItemsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = {...state}

    switch (action.type) {
        case RECEIVE_CART_ITEMS:
            return { ...action.cartItems };
        case RECEIVE_CART_ITEM:
            nextState[action.cartItems.product.id] = action.cartItems
            return {...nextState};
        case REMOVE_CART_ITEM:
            delete nextState[action.cartItemId]
            return nextState;
        case REMOVE_CART_ITEMS:
            return {};
        default:
            return nextState;
    };
};

export default cartItemsReducer;