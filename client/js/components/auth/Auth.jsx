import React        from 'react';
import { connect }  from 'react-redux'
import _            from 'lodash';

import { getGlobState, GlobState } from 'redux/selectors/state';

import AuthStarter from './AuthStarter.jsx'
import AuthFailure from './AuthFailure.jsx'

class Auth_ extends React.Component {
    
    render() {
        
        let authFailure = false;
        
        switch (this.props.globState) {
            case GlobState.FAILURE_AUTHENTICATING:
                authFailure = true;
                break;
        }
        
        return (
            <div className="center-container">
                
                <AuthStarter />
                
                {authFailure && (
                    <AuthFailure />
                )}
                
            </div>
        );
    }
}




const mapStateToProps = (state, props) => {
            
    return {
        globState: getGlobState(state, props)
    }
}

export const   Auth = connect(
    mapStateToProps
)(Auth_);

export default Auth;