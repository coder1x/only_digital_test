import { lazy } from 'react';

import Loading from './Loading/Loading';

const HistoricalEvents = lazy(() => import('./HistoricalEvents/HistoricalEvents'));

export { HistoricalEvents, Loading };
