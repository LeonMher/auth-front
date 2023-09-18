import { createStore } from 'redux';

const store = createStore(function(state, action){
    if(action.type === 'edit-current-user-name'){
        return{
            ...state,
            currentUser: {
                name: action.payload.name,
                userId: action.payload.userId

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