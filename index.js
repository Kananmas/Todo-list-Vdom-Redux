import createElement from "./Scripts/createElement";
import render from "./Scripts/render";
import diffProps from "./Scripts/diffProps";
import deepDiff from "./Scripts/deepDiff";
import redux from "./Custom-redux/Redux-custom";
import action from "./Custom-redux/createAction";
import { isEqual } from "./Scripts/isEqual"
import action from "./Custom-redux/createAction";

let inputField = document.getElementById('input-field')

let taskFieldInput = '';

let inputFieldElements = [createElement('div', {
    props: { class: 'input-field' }, children: [
        createElement('Input', { props: { type: 'text', placeholder: 'Please enter a text', id: 'taskField', change: taskFieldInputChange } }),
        createElement('button', { props: { id: 'AddTask', click: AddTask }, children: ['ADD'] })
    ]
})]

let renderedField = render(inputFieldElements)

inputField.replaceWith(renderedField)


// <div class="input-field">
//         <Input type="text" placeholder="Please enter a task" id="taskField"></Input>
//         <button id="AddTask">ADD</button>
//     </div>

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
                    state[i].children[0].props['checked'] = true;
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
                    delete (state[i].children[0].props['checked']);

                    return state;
                }
            }

        }


    }
    return state;
}


let store = redux.createStore(stateReducer, rootInitialState);

function taskFieldInputChange(e) {
    taskFieldInput = e.target.value;
}


function AddTask() {
    let task = taskFieldInput;

    if (task.length) {
        let id = Math.random().toString(16).slice(2);
        let payload = createElement('div', {
            props: { id, class: 'task' }, children: [
                createElement('input', { props: { type: 'checkbox', class: 'checked-box', change: onhandleChangeCheckBox }, children: [] }),
                createElement('span', { props: { class: 'task-text' }, children: [task] }),
                createElement('button', { props: { class: 'task-remover', click: onhandleClickRemoveBtn }, children: ['X'] }),
            ]
        });
        let Action = new action('ADD', payload)
        store.dispatch(Action);
        updateDom()
    }
}

function onhandleClickRemoveBtn(e) {
    let targetId = e.target.parentNode.id;

    let Action = new action('REMOVE', { id: targetId });

    store.dispatch(Action);

    updateDom();
}

function onhandleChangeCheckBox(e) {
    let parent = e.target.parentNode;
    let isDone = parent.className === ('done');

    if (!isDone) {
        console.log(e.target.checked)
        let _action = new action('DONE', { id: parent.id });
        store.dispatch(_action);
    }
    else {
        let _action = new action('NOT_DONE', { id: parent.id });
        store.dispatch(_action)
    }

    updateDom();
}
function updateDom() {
    let root = document.getElementById('root')
    let renderdStore = render(store.getState());

    if (!root.children.length) root.appendChild(renderdStore)
    else {

        deepDiff(root.children[0], renderdStore)
    }
}
