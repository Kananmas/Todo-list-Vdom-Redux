import { kindOf } from "./kindOf";

export function shapeCheckValid(reducers) {
    for (const key in reducers) {
        let reducer = reducers[key];
        let action = {
            type: '@INIT'
        }
        let action2 = {
            type: Math.random().toString(6).slice(2),
        }
        if (kindOf(reducer(undefined, action)) === 'undefined' || kindOf(reducer(undefined, action2)) === 'undefined') {
            throw new Error('action is not an type of undefined');
        }
    }
}
