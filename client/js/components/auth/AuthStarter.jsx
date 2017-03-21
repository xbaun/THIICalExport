import React        from 'react';
import { connect }  from 'react-redux'
import _            from 'lodash';

import { authStarted } from 'redux/actions/auth';

import style from 'AuthStarter.scss';

class AuthStarter_ extends React.Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            username: props.username || ""
          , password: props.password || ""
        };
        
        this.handleSubmit         = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        
    }
    
    handleSubmit(event) {
        
        this.props.handleSubmit({
            username: this.state.username,
            password: this.state.password,
        });
    }
    
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }
    
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    

    render() {
        
        return (
            
            <div>

                <form onSubmit={this.handleSubmit} id={style['authForm']}>
                
                    <h2>THI Login*</h2>
                
                    <div className="form-group">
                        <label className="sr-only" htmlFor="username">Username</label>
                        <input type="text" value={this.state.username} onChange={this.handleUsernameChange} className="form-control" id={style['username']} placeholder="Username" />
                    </div>
                    
                    <div className="form-group">
                        <label className="sr-only" htmlFor="password">Password</label>
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange}  className="form-control" id={style['password']} placeholder="Password" /> 
                    </div>
                
                
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Export Calendar</button>
                
                    <div className="info">
                        <div style={{display: 'flex'}}>
                            <div style={{flex: '0 0 1ex'}}> * </div>
                            <div>No login information will be logged nor stored</div>
                        </div>
                    </div>
                
                </form>
            
            </div>
            
        );
    }

}

const mapStateToProps = (state, ownProps) => {
  return {
    username: _.get(state, 'auth.username', ""),
    password: _.get(state, 'auth.password', "")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      
    handleSubmit(credentials) {
        dispatch(authStarted(credentials));
    }
  }
}

export const   AuthStarter = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthStarter_)

export default AuthStarter;