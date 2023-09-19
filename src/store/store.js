import { createStore } from 'redux';

const store = createStore(function(state, action){
    if(action.type === 'edit-current-user-name'){
        return{
            ...state,
            currentUser: {
                name: action.payload.name,
                employeeId: action.payload.employeeId

            }
        }
    }

    return state
},{
    currentUser:{
        name: 'John Doe'
    }
})

export default store;