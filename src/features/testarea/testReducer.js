import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { createReducer } from "../../app/common/util/reducerUtils";

const initalState = {
    data: 42
}

const incrementCounter = (state) => {
    return { ...state, data: state.data + 1};
}

const decrememtCounter = (state) => {
    return { ...state, data: state.data - 1};
}


export default createReducer(initalState, {
    [INCREMENT_COUNTER]: incrementCounter,
    [DECREMENT_COUNTER]: decrememtCounter
})