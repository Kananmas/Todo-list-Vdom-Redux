import { kindOf } from "./kindOf";


export function createStore(reducer, initalstate) {
    if (kindOf(reducer) !== 'function') {
        throw new Error('Reducer is not a function,but a ' + kindOf(reducer));
    }
    if (kindOf(initalstate) === 'function') {
        throw new Error(`initialstate couldn't be a function`)
    }

    let state = initalstate;
    let isDispached = false;
    let subscribtions = [];

    function dispatch(action) {
        if (kindOf(action) !== 'object') {
            throw new Error(`${action} is not an object`);
        }
        if (!('type' in action)) {
            throw new Error('action dose not have the property of type');
        }

        if (isDispached) {
            throw new Error('cannot do anything while processing');
        }

        try {
            isDispached = true;
            state = reducer(state, action);

        } finally {
            isDispached = false;
            broadcast();
        }
    }

    function broadcast() {
        for (const subscribtion of subscribtions) {
            subscribtion();
        }
    }

    function subscribe(listener) {
        subscribtions.push(listener);

        return function unsubscribe() {
            let listenerIndex = subscribtions.indexOf(listener);
            if (listenerIndex >= 0) {
                subscribtions.splice(listenerIndex, 1);
            }
        }
    }

    dispatch({
        type: '@INIT'
    })

    function getState() {
        if (isDispached) {
            throw new Error('cannot show state while processing');
        }
        return state;
    }

    return {
        dispatch,
        getState,
        subscribe,
    }

}
