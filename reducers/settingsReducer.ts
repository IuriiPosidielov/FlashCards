import { createSlice } from '@reduxjs/toolkit'


export type InitialState = {
    fromLanguage: string,
    toLanguage: string,
}

const initialState: InitialState = {
    fromLanguage: "pl",
    toLanguage: "en",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setFromLanguage (state, action) {
            state.fromLanguage = action.payload
        },
        setToLanguage (state, action) {
            state.toLanguage = action.payload
        }
    }

});

export const { setFromLanguage, setToLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;