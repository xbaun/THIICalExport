import React       from 'react';
import { connect } from 'react-redux'
import _           from 'lodash';

import { getGlobState } from 'redux/selectors/state';
import { saveICal }     from 'redux/actions/save';
import { reset }        from 'redux/actions/misc';


class Download_ extends React.Component {
    
    render() {
        
        return (
            <div className="center-container">
                <button onClick={this.props.handleSaveICal} className="btn btn-lg btn-success btn-block">Download</button>
                <button className="btn btn-primary  btn-block" onClick={this.props.handleRetryClick}>Retry</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
            
    return {
        globalState: getGlobState(state, props)
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
        handleSaveICal() {
            dispatch(saveICal());
        },
        
        handleRetryClick(event) {
            dispatch(reset());
        }
    }
}


export const   Download = connect(
    mapStateToProps,
    mapDispatchToProps
)(Download_)

export default Download;