import { getGlobState, GlobState } from 'redux/selectors/state';

export const debugGlobStateMiddleware = store => next => action => {
    
    let result = next(action);    

    console.log(`GlobState: ${getGlobState(store.getState())}`);

    return result;
    
};
