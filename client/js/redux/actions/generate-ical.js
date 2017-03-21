export const GENERATE_ICAL_STARTED = "GENERATE ICAL STARTED";

export const genICalStarted = () => {
    return {
        type: GENERATE_ICAL_STARTED
    }
}

export const GENERATE_ICAL_SUCCESS = "GENERATE ICAL SUCCESS";

export const genICalSuccess = (ical) => {
    return {
        type: GENERATE_ICAL_SUCCESS,
        ical
    }
}

export const GENERATE_ICAL_FAILURE = "GENERATE ICAL FAILURE";

export const genICalFailure = (error) => {
    return {
        type : GENERATE_ICAL_FAILURE,
        error: error
    }
}

// genICalActions.genSuccess
// authActions.authSuccess