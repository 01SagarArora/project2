import { GET_JELLY_BEAN } from '../utils/ApiConstants';

import { commonApi } from './../api/apis';
import { setJellyBeanData } from './../slices/jellyBeanMainDataSlice'
import { Dispatch, AnyAction } from 'redux';

const fetchJellyBeanRequest = async (dispatch: Dispatch<AnyAction>,store: any) => {

    store.dispatch(commonApi.endpoints.getApi.initiate({ url: GET_JELLY_BEAN })).then((res: any) => {
        try {          
            const { items: jellyBeanList } = res.data;   
            dispatch(setJellyBeanData(jellyBeanList));       
        } catch (e) {
            console.log(e)        
        }
    })
    return Promise.all(store.dispatch(commonApi.util.getRunningQueriesThunk()));
};
export { fetchJellyBeanRequest };
