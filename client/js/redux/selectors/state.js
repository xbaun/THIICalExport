import { createSelector } from 'reselect';

export const getAuthState = (state) =>
    state.auth.state;

export const getICalState = (state) =>
    state.ical.state;
    
    
export const GlobState = {
      
      STARTED_AUTHENTICATING: "STARTED: AUTHENTICATING",
      FAILURE_AUTHENTICATING: "FAILURE: AUTHENTICATING",
      SUCCESS_AUTHENTICATING: "SUCCESS: AUTHENTICATING",
      
      STARTED_GENERATING_CAL: "STARTED: GENERATING CAL",
      FAILURE_GENERATING_CAL: "FAILURE: GENERATING CAL",
      SUCCESS_GENERATING_CAL: "SUCCESS: GENERATING CAL"
      
}

export const getGlobState = createSelector(
    [getAuthState, getICalState],
    (authState, icalState) => {
        
        if (authState == "STARTED" && icalState == null) {
            return GlobState.STARTED_AUTHENTICATING; //"STARTED: AUTHENTICATING";
        }
        
        if (authState == "FAILURE") {
            return GlobState.FAILURE_AUTHENTICATING; //"FAILURE: AUTHENTICATING";
        }
        
        if (authState == "SUCCESS" && icalState == null) {
            return GlobState.SUCCESS_AUTHENTICATING; //"SUCCESS: AUTHENTICATING";
        }

        if (authState == "SUCCESS" && icalState == "STARTED") {
            return GlobState.STARTED_GENERATING_CAL; //"STARTED: GENERATING CAL";
        }

        if (authState == "SUCCESS" && icalState == "FAILURE") {
            return GlobState.FAILURE_GENERATING_CAL; //"FAILURE: GENERATING CAL";
        }
        
        if (authState == "SUCCESS" && icalState == "SUCCESS") {
            return GlobState.SUCCESS_GENERATING_CAL; //"SUCCESS: GENERATING CAL";
        }
        
        return null;
        
    }
);


/* export function getAppState(state) {
    
    if (state.auth.state == "STARTED" && 
        state.ical.state == null) {

        return "STARTED: AUTHENTICATING";
            
    }
    
    if (state.auth.state == "SUCCESS" && 
        state.ical.state == null) {

        return "SUCCESS: AUTHENTICATING";
            
    }
    
    if (state.auth.state == "FAILURE" && 
        state.ical.state == null) {

        return "FAILURE: AUTHENTICATING";
            
    }
    
    if (state.auth.state == "SUCCESS" && 
        state.ical.state == "STARTED") {
         
        return "STARTED: GENERATING CAL";
         
    }
    
    if (state.auth.state == "SUCCESS" && 
        state.ical.state == "FAILURE") {
         
        return "FAILURE: GENERATING CAL";
         
    }
    
    if (state.auth.state == "SUCCESS" && 
        state.ical.state == "SUCCESS") {
         
        return "SUCCESS: GENERATING CAL";
         
    }
    
    return null;
    
}*/