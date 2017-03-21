import { AUTH_STARTED, AUTH_SUCCESS, AUTH_FAILURE } from 'redux/actions/auth';
import { RESET } from 'redux/actions/misc';

const init = {
    state:    undefined,
    username: undefined,
    password: undefined
};

export default (state = init, action) => {
        
    switch (action.type) {
        case AUTH_FAILURE:
            
            return Object.assign({}, state, {
                state: 'FAILURE'
            });

        case AUTH_SUCCESS:
            
            return Object.assign({}, state, {
                state: 'SUCCESS'
            });
            
            
        case AUTH_STARTED:
            
            return Object.assign({}, state, {
                    state:    'STARTED',
                    username: action.username,
                    password: action.password
            });
            
        case RESET:
            
            return Object.assign({}, state, {
                    state:    undefined,
                    username: undefined,
                    password: undefined
            });
    }
    
    return state;
    
}