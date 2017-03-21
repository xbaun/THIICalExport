import React from 'react';

import style from 'AuthFailure.scss'

class AuthFailure extends React.Component {
    
    render() {

        return (
            <div id={style['authFailure']} className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &emsp;Authentication failed
            </div>
        );
    }
}


export { AuthFailure };
export default AuthFailure;