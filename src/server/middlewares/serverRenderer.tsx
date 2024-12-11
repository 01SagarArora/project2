import { renderToString } from 'react-dom/server';
import { Response, RequestHandler } from 'express';
import { ChunkExtractor } from '@loadable/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from '../../App';
import { fetchJellyBeanRequest } from '../../services/jellyBeanListRequest';

import { initStore, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTE_CONSTANTS } from '../../constants/routeConstants';
import HelmetAsync from 'react-helmet-async';
const { HelmetProvider } = HelmetAsync;

const serverRenderer = (chunkExtractor: ChunkExtractor):
    RequestHandler => async (req: any, res: Response, next: Function) => {
        // Check if the requested page is available
        const isPageAvailable = (Object.values(ROUTE_CONSTANTS) as string[]).includes(req.path);
        if (!isPageAvailable) {
            req.url = ROUTE_CONSTANTS.NOT_FOUND;
        }


        const dispatch = useDispatch();

        res.type('html');

        const location: string = req.url;
        let preloadedState: Partial<RootState> = {};  // Initialize preloaded state
        const store = initStore();  // Create Redux store with initial state

        // Fetch additional data (if needed) based on cookies
        console.log("Fetching data for SagarUsername...");
        await fetchJellyBeanRequest(dispatch, store);

        const helmetContext = {};  // Initialize context for Helmet

        // Create JSX for server-side rendering
        const jsx = (
            <Provider store={store}>
                <HelmetProvider context={helmetContext}>
                    <StaticRouter location={location}>
                        <App />
                    </StaticRouter>
                </HelmetProvider>
            </Provider>
        );

        // Render the app to a string
        const reactHtml = renderToString(jsx);

        res.status(200).send(reactHtml);
    };

export { serverRenderer };
