import React from 'react';
import { bindActionCreators } from 'redux';
import * as storeActions from '../store/action-creators';
import { useDispatch } from 'react-redux';

const useActions = () => {
    const dispatch = useDispatch();
    return React.useMemo(() => {
        return bindActionCreators(storeActions, dispatch);
    }, [dispatch]);
};

export default useActions;
