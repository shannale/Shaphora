export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";

export const receiveReviews = (reviews) => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const initialState = {
    reviews: {},
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_REVIEWS:
            return { ...action.reviews }
        default:
            return state;
    }
};

export default reviewsReducer;