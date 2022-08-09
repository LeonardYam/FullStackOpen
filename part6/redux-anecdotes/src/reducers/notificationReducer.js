import { createSlice } from "@reduxjs/toolkit"

const initialState = {message: '', prevId: null}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        display(state, action) {
            return action.payload
        },
        clear(state, action) {
            return initialState
        }
    }
})

export const { display, clear } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return async (dispatch, getState) => {
        clearTimeout(getState().notification.prevId)
        const id = setTimeout(() => dispatch(clear()), seconds * 1000)
        dispatch(display({message, prevId: id}))
    }
}

export default notificationSlice.reducer