import 'focus-visible/dist/focus-visible.min.js';
import '@styles/styles';
import './pages/index';

type RequireContext = {
  keys(): string[];
  (id: string): any;
  <T>(id: string): T;
  resolve(id: string): string;
  id: string;
};

function requireAll(requireContext: RequireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components/', true, /^\.\/(?!.*((?:__tests__)|(?:\.d))).*\.(scss)$/));
requireAll(require.context('./pages/', true, /^\.\/(?!.*((?:__tests__)|(?:\.d))).*\.(scss)$/));
