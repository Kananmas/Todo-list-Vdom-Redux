import zip from "./Scripts/zip";
import createElement from "./Scripts/createElement";
import render from "./Scripts/render";
import diffProps from "./Scripts/diffProps";
import deepDiff from "./Scripts/deepDiff";
import redux from "./Custom-redux/Redux-custom";
import action from "./Custom-redux/createAction";
import { isEqual } from "./Scripts/isEqual"
import action from "./Custom-redux/createAction";

let rootInitialState = [];

let stateReducer = (initialState = rootInitialState, action) => {
    let state = [...initialState];
    switch (action.type) {
        case 'ADD':
            state.push(action.payload);
            break;
        case 'REMOVE':
            let targetId = action.payload.id;
            state = state.filter((i) => {
                if (i.props.id !== targetId) return i;
            })
            break;
        case 'DONE': {
            let targetId = action.payload.id;

            for (let i = 0; i < state.length; i++) {
                let props = state[i].props;
                if (props.id == targetId) {
                    state[i].props.class = 'done';
                    return state;
                }
            }
        }
        case 'NOT_DONE': {
            let targetId = action.payload.id;

            for (let i = 0; i < state.length; i++) {
                let props = state[i].props;
                if (props.id == targetId) {
                    state[i].props.class = 'task';
                    return state;
                }
            }

        }


    }
    return state;
}


let store = redux.createStore(stateReducer, rootInitialState);



let addBtn = document.getElementById('AddTask');


function AddTask() {
    let taskField = document.getElementById('taskField');
    let task = taskField.value;

    if (task.length) {
        let id = Math.random().toString(16).slice(2);
        let payload = createElement('div', {
            props: { id, class: 'task' }, children: [
                createElement('input', { props: { type: 'checkbox', class: 'checked-box' }, children: [] }),
                createElement('span', { props: { class: 'task-text' }, children: [task] }),
                // createElement('span',{props:{},children:[]})
                createElement('button', { props: { class: 'task-remover' }, children: ['X'] }),
            ]
        });
        let Action = new action('ADD', payload)
        store.dispatch(Action)
    }
}

addBtn.addEventListener('click', () => {
    AddTask();
}, false)



setInterval(() => {

    let renderdStore = render(store.getState());
    let root = document.getElementById('root')

    // console.log(renderdStore)

    let removeBtns = document.querySelectorAll('.task-remover');

    removeBtns.forEach((i) => {
        i.addEventListener('click', () => {
            let parentId = i.parentNode.id;
            let Action = new action('REMOVE', { id: parentId });

            store.dispatch(Action);

        }, false)
    })

    let checkedbox = document.querySelectorAll('.checked-box');

    checkedbox.forEach((i) => {
        i.addEventListener('change', () => {
            let parent = i.parentNode;
            let isDone = parent.className === ('done');
            if (!isDone) {
                let _action = new action('DONE', { id: parent.id });
                store.dispatch(_action);
            }
            else {
                let _action = new action('NOT_DONE', { id: parent.id });
                store.dispatch(_action)
            }
        }, false)
    })


    deepDiff(root.children[0], renderdStore)


}, 10)
