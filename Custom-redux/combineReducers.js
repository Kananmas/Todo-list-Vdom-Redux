import { kindOf } from "./kindOf";
import { shapeCheckValid } from "./shapeCheckValid";

export function combineReducers(reducers) {
    if (kindOf(reducers) !== 'object') {
        throw new Error('reducers should be stroed in an object');
    }
    let finalreducers = {};
    for (const reducerKey in reducers) {
        const reducer = reducers[reducerKey];

        if ((kindOf(reducer) === 'function')) {
            finalreducers[reducerKey] = reducer;
        }
    }

    let shapeError;
    try {
        shapeCheckValid(finalreducers);
    } catch (error) {
        shapeError = error;
    }

    return (state = {}, action) => {
        if (shapeError) { throw new Error(shapeError); }

        let nextState = state;
        let hasChanged = false;
        let target = action.target;
        if (target) {
            if (target in finalreducers) {
                let targetReducer = finalreducers[target];
                let reducerState = state[target] || undefined;
                let reducerNewState = targetReducer(reducerState, action)
                hasChanged = (reducerNewState !== reducerState);
                nextState[target] = hasChanged ? reducerNewState : reducerState;
            }
            return nextState;
        }
        else {
            if (action.type === '@INIT' || action.target === '*') {
                for (const reducerKey in finalreducers) {
                    const reducer = finalreducers[reducerKey];
                    const reducerState = state[reducerKey] || undefined;
                    const newReducerState = reducer(reducerState, action);

                    hasChanged = hasChanged || reducerState !== newReducerState;
                    nextState[reducerKey] = newReducerState;
                }

                return hasChanged ? nextState : state;
            }
            throw new Error('action must have the property of type')
        }
    }
}
