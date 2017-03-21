import React from 'react';
import { connect } from 'react-redux'

import Auth      from './auth/Auth.jsx'
import Progress  from './Progress.jsx'
import Download  from './Download.jsx'
import ErrorView from './ErrorView.jsx'

import { getGlobState, GlobState } from 'redux/selectors/state';

import 'App.scss'; 

export class App_ extends React.Component {
    
    render() {
    
        let view;
    
        switch (this.props.globState) {
            default:
            case GlobState.FAILURE_AUTHENTICATING: 
    
                view = <Auth />;
                break;
    
            case GlobState.STARTED_AUTHENTICATING:
            case GlobState.SUCCESS_AUTHENTICATING:
            case GlobState.STARTED_GENERATING_CAL:
            
                view = <Progress />;
                break;
            
            case GlobState.SUCCESS_GENERATING_CAL:
            
                view = <Download />;
                break;
                
            case GlobState.FAILURE_GENERATING_CAL:
            
                view = <ErrorView />;
                break;
        }
        
        
        return (
            
            <div>
                <div className="jumbotron header">
                    <div className="container">
                        <h1>THI iCal Export</h1>
                        <p>Export your THI timetable to iCal</p>
                    </div>
                </div>

                {view}
                
            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
            
    return {
        globState: getGlobState(state, props)
    }
}

export const   App = connect(
    mapStateToProps
)(App_);

export default App;