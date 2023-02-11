import { createSlice } from '@reduxjs/toolkit'

export type FlashCard = {
    index: number;
    origin: string;
    translation: string;
    picture: string;
    completed: boolean
}

export type InitialState = {
    selectedItem : number,
    items: FlashCard[];
}

const initialState: InitialState = {
    selectedItem : 0,
    items: [
        {
            index: 0,
            origin: "hello",
            translation: "czesc",
            picture: "",
            completed: false,
        }
    ],
};

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        cardAdded (state, action) {
            const card : any = action.payload;
            const res = state.items.find(fc => fc.origin == card.origin);
            if (typeof res == "undefined") { // no duplicates
                state.items.push(card)
            }
        },
        cardToggled (state, action) {
            const origin = action.payload;
            const card = state.items.find(card => card.origin == origin);
            if (card) card.completed = !card.completed;
        },
        cardRemoved (state, action) {
            const origin = action.payload;
            state.items = state.items.filter(e => e.origin != origin);
        },
        cardSelected (state, action) {
            state.selectedItem = action.payload;
        }
    }
});

export const { cardAdded, cardToggled, cardRemoved } = cardsSlice.actions;
export default cardsSlice.reducer;
