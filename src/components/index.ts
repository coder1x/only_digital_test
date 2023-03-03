import { lazy } from 'react';

import Loading from './Loading/Loading';
import Navigation from './Navigation/Navigation';
import Range from './Range/Range';
import Slider from './Slider/Slider';
import Spinner from './Spinner/Spinner';

const HistoricalEvents = lazy(() => import('./HistoricalEvents/HistoricalEvents'));

export { HistoricalEvents, Loading, Navigation, Range, Slider, Spinner };
