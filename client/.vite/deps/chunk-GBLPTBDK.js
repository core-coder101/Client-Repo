import {
  useTheme_default
} from "./chunk-C2N26PTQ.js";
import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_identifier
} from "./chunk-JMMXXZJA.js";
import {
  require_react
} from "./chunk-N4N5IM6X.js";
import {
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/@mui/material/styles/useTheme.js
var React = __toESM(require_react());
init_defaultTheme();
init_identifier();
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

export {
  useTheme
};
//# sourceMappingURL=chunk-GBLPTBDK.js.map
