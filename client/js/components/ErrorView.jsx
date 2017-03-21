import React       from 'react';
import { connect } from 'react-redux'
import _           from 'lodash';

import {reset}       from 'redux/actions/misc';


class ErrorView_ extends React.Component {
    
    render() {
        
        return (
            
            <div className="alert alert-danger center-container" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &emsp;Upps... an error occurred 
                &emsp;<button className="btn btn-primary" onClick={this.props.handleRetryClick}>Retry</button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    
    return {
        state: null
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    
    return {
        handleRetryClick(event) {
            dispatch(reset());
        }
    }
}

export const   ErrorView = connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorView_)

export default ErrorView;