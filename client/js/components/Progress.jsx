import React       from 'react';
import { connect } from 'react-redux'
import _           from 'lodash';


import { spinner } from 'Spinner.scss';
import style from 'Progress.scss';

class Progress extends React.Component {
    
    render() {
        
        return (
            
            <div className={style['progress']}>
                <div id={spinner}>
                    <div className="outer">
                        <div className="inner1"></div>
                        <div className="inner2"></div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export { Progress };
export default Progress;