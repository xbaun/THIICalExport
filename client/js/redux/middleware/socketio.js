import io from 'connection/io';
import { AUTH_STARTED } from 'redux/actions/auth';

export default store => next => action => {

    switch (action.type) {
        case AUTH_STARTED:
            
            io.emit('auth', {
                username: action.username,
                password: action.password
            })
            
            break;
    }

    return next(action);
  
};
