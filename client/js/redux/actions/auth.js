export const AUTH_STARTED = "AUTH STARTED";

export const authStarted = (credentials) => {
    return {
        type: AUTH_STARTED,
        ...credentials
    }
}

export const AUTH_SUCCESS = "AUTH SUCCESS";

export const authSuccess = () => {
    return {
        type: AUTH_SUCCESS
    }
}

export const AUTH_FAILURE = "AUTH FAILURE";

export const authFailure = () => {
    return {
        type: AUTH_FAILURE
    }
}