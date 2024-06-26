// create store
function counterStore(reducer){
    let state = reducer(undefined,{})
    const subscribers = []
    return {
        getState(){
            return state;
        },
        dispatch(action){
            state=reducer(state,action)

            subscribers.forEach(subscriber => subscriber())
        },
        subscribe(subscriber){
            subscribers.push(subscriber)
        }
    }
}
//create reducer
function counterReducer(state = 0 , action){
    switch (action.type){
        case "Increase":
            return state + 1;
        case "Decrease":
            return state- 1;
        case "Clear":
            return state = 0
        default:
            return state 
    }
}

const store = counterStore(counterReducer);

//create action
function increaseAction(){
    return {
        type : 'Increase'
    }
}

function decreaseAction(){
    return {
        type : 'Decrease'
    }
}
function Clear(){
    return {
        type : 'Clear'
    }
}

//getButtonDOM
const increase = document.querySelector('#increase')
const decrease = document.querySelector('#decrease')
const clear = document.querySelector('#clear')


//defind button clicked
increase.onclick = function() {
    store.dispatch(increaseAction())
}
decrease.onclick = function() {
    store.dispatch(decreaseAction())
}
clear.onclick = function() {
    store.dispatch(Clear())
}


//render to screen
function renderScreen(){
    const output = document.querySelector('#screen')
    output.innerText = store.getState();
}

store.subscribe( () => {
    console.log("update"),
    renderScreen();
})

console.log(store.getState())
renderScreen()