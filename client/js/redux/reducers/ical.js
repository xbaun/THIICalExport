import { AUTH_FAILURE } from 'redux/actions/auth';
import { GENERATE_ICAL_SUCCESS, GENERATE_ICAL_FAILURE } from 'redux/actions/generate-ical';
import { RESET } from 'redux/actions/misc';

const init = {
    state: null,
    downl: null
};
 
export default (state = init, action) => {
      
    switch (action.type) {
        case AUTH_FAILURE:
                        
            return Object.assign({}, state, {
                state: null,
                downl: null
            });
               
        case GENERATE_ICAL_SUCCESS:
            
            return Object.assign({}, state, {
                state: 'SUCCESS',
                downl: action.ical
            });
            
        case GENERATE_ICAL_FAILURE:
            
            return Object.assign({}, state, {
                state: 'FAILURE',
                downl: null
            });
            
        case RESET:
            
            return Object.assign({}, state, {
                    state: undefined,
                    downl: undefined
            });
    }
    
    return state;
    
};