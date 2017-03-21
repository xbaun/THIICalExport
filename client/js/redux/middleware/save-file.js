import _ from 'lodash';
import FileSaver from 'file-saver';

import { SAVE_ICAL } from 'redux/actions/save';

export default store => next => action => {
    
    switch (action.type) {
        case SAVE_ICAL:
            
            var state = store.getState();
            
            var downl = _.get(state, 'ical.downl');
            var usern = _.get(state, 'auth.username');
            
            if (downl && usern) {
            
                FileSaver.saveAs(new Blob([downl]), `${usern}.ics`)
                
            }
            
            break;
    }
      
    return next(action);
    
}