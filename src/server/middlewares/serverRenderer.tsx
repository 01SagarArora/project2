import { renderToString } from 'react-dom/server';
import { Response, RequestHandler } from 'express';
import { ChunkExtractor } from '@loadable/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from '../../App';
import { fetchJellyBeanS2SRequest } from '../../server/services/fetchJellyBeanS2SRequest';

import { initStore, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTE_CONSTANTS } from '../../constants/routeConstants';
import * as HelmetAsync from 'react-helmet-async';
import serialize from 'serialize-javascript';


// import HelmetAsync from 'react-helmet-async';
const { HelmetProvider } = HelmetAsync;

const serverRenderer = (chunkExtractor: ChunkExtractor):
    RequestHandler => async (req: any, res: Response, next: Function) => {


        // const dispatch = useDispatch();

        // Check if 
        // the requested page is available
        const isPageAvailable = (Object.values(ROUTE_CONSTANTS) as string[]).includes(req.path);
        if (!isPageAvailable) {
            req.url = ROUTE_CONSTANTS.NOT_FOUND;
        }

        res.type('html');

        const location: string = req.url;
        // console.log(req.url, req);
        let preloadedState: Partial<RootState> = {};  // Initialize preloaded state
        const store = initStore(preloadedState);

        console.log("Fetching data for SagarUsername...");

        await fetchJellyBeanS2SRequest(store);
        preloadedState = { ...store.getState() };

        const helmetContext = {};

        const jsx = (
            <Provider store={store}>
                <App />
            </Provider>
        );

        // Render the app to a string
        const reactHtml = renderToString(jsx);

        const html = `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <title>SSR with Hydration</title>
                            </head>
                            <body>
                                <div id="root">${reactHtml}</div>
                                <script ">window.__PRELOADED_STATE__ = ${serialize(preloadedState)}</script>
                                <script src="/client/client.cjs"></script>

                            </body>
                            </html>
                        `;

        res.status(200).send(html);


        // const fullHtml = renderFullPage(reactHtml, store.getState());


    };

export { serverRenderer };
