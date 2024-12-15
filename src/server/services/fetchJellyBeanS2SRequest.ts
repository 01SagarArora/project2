import { GET_JELLY_BEAN } from '../../utils/ApiConstants';
import { commonS2SApi } from '../../api/apis'
import { setJellyBeanData } from '../../slices/jellyBeanMainDataSlice'

const fetchJellyBeanS2SRequest = async (store: any) => {
    store.dispatch(commonS2SApi.endpoints.getApi.initiate({ url: GET_JELLY_BEAN })).then((res: any) => {
        try {
            const { items: jellyBeanList } = JSON.parse(res.data);
            store.dispatch(setJellyBeanData(jellyBeanList))
        } catch (e) {
            console.log(e)
        }
    })
    return Promise.all(store.dispatch(commonS2SApi.util.getRunningQueriesThunk()));
};
export { fetchJellyBeanS2SRequest };