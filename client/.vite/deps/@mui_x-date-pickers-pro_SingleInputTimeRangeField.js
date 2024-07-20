import {
  DAY_MARGIN,
  DAY_SIZE,
  DIALOG_WIDTH,
  PickersLayout,
  PickersTextField,
  areDatesEqual,
  convertFieldResponseIntoMuiTextFieldProps,
  createDateStrForV6InputFromSections,
  createDateStrForV7HiddenInputFromSections,
  getDefaultReferenceDate,
  getTodayDate,
  replaceInvalidDateByNull,
  splitFieldInternalAndForwardedProps,
  useClearableField,
  useDefaultizedTimeField,
  useField,
  useUtils,
  validateTime
} from "./chunk-DU7NB666.js";
import "./chunk-BRAU7EQW.js";
import "./chunk-IORPSWEI.js";
import "./chunk-GL2LM6RO.js";
import "./chunk-TI5DOHHX.js";
import "./chunk-R6ZZY3EO.js";
import {
  TextField_default
} from "./chunk-H4FIRMUS.js";
import "./chunk-PTWZTBAQ.js";
import "./chunk-TCJ7PNNY.js";
import "./chunk-PKETHS2R.js";
import {
  Typography_default
} from "./chunk-NG2VY6HZ.js";
import "./chunk-SSFJ5B3C.js";
import "./chunk-KA56GNYU.js";
import {
  ButtonBase_default
} from "./chunk-KGWDNYFJ.js";
import "./chunk-W2BXD4VF.js";
import "./chunk-CCFWTPCC.js";
import "./chunk-IAIIGZ6H.js";
import "./chunk-ZZYEBXMQ.js";
import "./chunk-A2CVXFM7.js";
import "./chunk-J6RQQO32.js";
import "./chunk-K6AAKQF4.js";
import "./chunk-ZRSM3M3F.js";
import "./chunk-ST7GYZMF.js";
import "./chunk-YY5L5IOT.js";
import "./chunk-AX4CQTPO.js";
import "./chunk-G6M6PD2S.js";
import {
  useSlotProps
} from "./chunk-7B4JDJS4.js";
import "./chunk-GCZA3YJT.js";
import "./chunk-JQFBRKUR.js";
import "./chunk-2OCNDRV5.js";
import "./chunk-PGKFFMIR.js";
import "./chunk-75BD2E4G.js";
import {
  CSSTransition_default,
  TransitionGroup_default
} from "./chunk-GIQT6IGO.js";
import "./chunk-JKHCW57Z.js";
import "./chunk-Q7G2DPWV.js";
import "./chunk-K4SXMS4P.js";
import "./chunk-DITQQIUL.js";
import {
  useThemeProps
} from "./chunk-3D5PFDBV.js";
import "./chunk-W3VT5O72.js";
import {
  useTheme
} from "./chunk-GBLPTBDK.js";
import {
  alpha
} from "./chunk-C2N26PTQ.js";
import {
  init_useEventCallback,
  init_utils,
  refType_default,
  useEnhancedEffect_default,
  useForkRef
} from "./chunk-XGT63MRO.js";
import "./chunk-QGICQ56W.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_composeClasses,
  styled_default
} from "./chunk-JMMXXZJA.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-WKJ4PPP4.js";
import {
  _objectWithoutPropertiesLoose,
  init_objectWithoutPropertiesLoose
} from "./chunk-2TJCF3JD.js";
import {
  require_jsx_runtime
} from "./chunk-GGADGINT.js";
import "./chunk-DOR5UOZM.js";
import "./chunk-EHECOLCS.js";
import {
  require_prop_types
} from "./chunk-E4AT6V7E.js";
import {
  _extends,
  init_extends
} from "./chunk-72JO3JMQ.js";
import "./chunk-KLGTMP6T.js";
import {
  require_react
} from "./chunk-N4N5IM6X.js";
import {
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/@mui/x-date-pickers-pro/SingleInputTimeRangeField/SingleInputTimeRangeField.js
init_extends();
init_objectWithoutPropertiesLoose();
var React8 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@mui/x-date-pickers/internals/components/pickersToolbarButtonClasses.js
init_utils();
var pickersToolbarButtonClasses = generateUtilityClasses("MuiPickersToolbarButton", ["root"]);

// node_modules/@mui/x-date-pickers/internals/hooks/useStaticPicker/useStaticPicker.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
init_clsx();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var PickerStaticLayout = styled_default(PickersLayout)(({
  theme
}) => ({
  overflow: "hidden",
  minWidth: DIALOG_WIDTH,
  backgroundColor: (theme.vars || theme).palette.background.paper
}));

// node_modules/@mui/x-date-pickers/DateCalendar/DayCalendar.js
init_objectWithoutPropertiesLoose();
init_extends();
var React5 = __toESM(require_react());
init_useEventCallback();
init_utils();
init_clsx();

// node_modules/@mui/x-date-pickers/PickersDay/PickersDay.js
init_objectWithoutPropertiesLoose();
init_extends();
var React2 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_utils();

// node_modules/@mui/x-date-pickers/PickersDay/pickersDayClasses.js
init_utils();
function getPickersDayUtilityClass(slot) {
  return generateUtilityClass("MuiPickersDay", slot);
}
var pickersDayClasses = generateUtilityClasses("MuiPickersDay", ["root", "dayWithMargin", "dayOutsideMonth", "hiddenDaySpacingFiller", "today", "selected", "disabled"]);

// node_modules/@mui/x-date-pickers/PickersDay/PickersDay.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["autoFocus", "className", "day", "disabled", "disableHighlightToday", "disableMargin", "hidden", "isAnimating", "onClick", "onDaySelect", "onFocus", "onBlur", "onKeyDown", "onMouseDown", "onMouseEnter", "outsideCurrentMonth", "selected", "showDaysOutsideCurrentMonth", "children", "today", "isFirstVisibleCell", "isLastVisibleCell"];
var useUtilityClasses = (ownerState) => {
  const {
    selected,
    disableMargin,
    disableHighlightToday,
    today,
    disabled,
    outsideCurrentMonth,
    showDaysOutsideCurrentMonth,
    classes
  } = ownerState;
  const isHiddenDaySpacingFiller = outsideCurrentMonth && !showDaysOutsideCurrentMonth;
  const slots = {
    root: ["root", selected && !isHiddenDaySpacingFiller && "selected", disabled && "disabled", !disableMargin && "dayWithMargin", !disableHighlightToday && today && "today", outsideCurrentMonth && showDaysOutsideCurrentMonth && "dayOutsideMonth", isHiddenDaySpacingFiller && "hiddenDaySpacingFiller"],
    hiddenDaySpacingFiller: ["hiddenDaySpacingFiller"]
  };
  return composeClasses(slots, getPickersDayUtilityClass, classes);
};
var styleArg = ({
  theme
}) => _extends({}, theme.typography.caption, {
  width: DAY_SIZE,
  height: DAY_SIZE,
  borderRadius: "50%",
  padding: 0,
  // explicitly setting to `transparent` to avoid potentially getting impacted by change from the overridden component
  backgroundColor: "transparent",
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.short
  }),
  color: (theme.vars || theme).palette.text.primary,
  "@media (pointer: fine)": {
    "&:hover": {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
    }
  },
  "&:focus": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
    [`&.${pickersDayClasses.selected}`]: {
      willChange: "background-color",
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  },
  [`&.${pickersDayClasses.selected}`]: {
    color: (theme.vars || theme).palette.primary.contrastText,
    backgroundColor: (theme.vars || theme).palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": {
      willChange: "background-color",
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  },
  [`&.${pickersDayClasses.disabled}:not(.${pickersDayClasses.selected})`]: {
    color: (theme.vars || theme).palette.text.disabled
  },
  [`&.${pickersDayClasses.disabled}&.${pickersDayClasses.selected}`]: {
    opacity: 0.6
  },
  variants: [{
    props: {
      disableMargin: false
    },
    style: {
      margin: `0 ${DAY_MARGIN}px`
    }
  }, {
    props: {
      outsideCurrentMonth: true,
      showDaysOutsideCurrentMonth: true
    },
    style: {
      color: (theme.vars || theme).palette.text.secondary
    }
  }, {
    props: {
      disableHighlightToday: false,
      today: true
    },
    style: {
      [`&:not(.${pickersDayClasses.selected})`]: {
        border: `1px solid ${(theme.vars || theme).palette.text.secondary}`
      }
    }
  }]
});
var overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, !ownerState.disableMargin && styles.dayWithMargin, !ownerState.disableHighlightToday && ownerState.today && styles.today, !ownerState.outsideCurrentMonth && ownerState.showDaysOutsideCurrentMonth && styles.dayOutsideMonth, ownerState.outsideCurrentMonth && !ownerState.showDaysOutsideCurrentMonth && styles.hiddenDaySpacingFiller];
};
var PickersDayRoot = styled_default(ButtonBase_default, {
  name: "MuiPickersDay",
  slot: "Root",
  overridesResolver
})(styleArg);
var PickersDayFiller = styled_default("div", {
  name: "MuiPickersDay",
  slot: "Root",
  overridesResolver
})(({
  theme
}) => _extends({}, styleArg({
  theme
}), {
  // visibility: 'hidden' does not work here as it hides the element from screen readers as well
  opacity: 0,
  pointerEvents: "none"
}));
var noop = () => {
};
var PickersDayRaw = React2.forwardRef(function PickersDay(inProps, forwardedRef) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersDay"
  });
  const {
    autoFocus = false,
    className,
    day,
    disabled = false,
    disableHighlightToday = false,
    disableMargin = false,
    isAnimating,
    onClick,
    onDaySelect,
    onFocus = noop,
    onBlur = noop,
    onKeyDown = noop,
    onMouseDown = noop,
    onMouseEnter = noop,
    outsideCurrentMonth,
    selected = false,
    showDaysOutsideCurrentMonth = false,
    children,
    today: isToday = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    autoFocus,
    disabled,
    disableHighlightToday,
    disableMargin,
    selected,
    showDaysOutsideCurrentMonth,
    today: isToday
  });
  const classes = useUtilityClasses(ownerState);
  const utils = useUtils();
  const ref = React2.useRef(null);
  const handleRef = useForkRef(ref, forwardedRef);
  useEnhancedEffect_default(() => {
    if (autoFocus && !disabled && !isAnimating && !outsideCurrentMonth) {
      ref.current.focus();
    }
  }, [autoFocus, disabled, isAnimating, outsideCurrentMonth]);
  const handleMouseDown = (event) => {
    onMouseDown(event);
    if (outsideCurrentMonth) {
      event.preventDefault();
    }
  };
  const handleClick = (event) => {
    if (!disabled) {
      onDaySelect(day);
    }
    if (outsideCurrentMonth) {
      event.currentTarget.focus();
    }
    if (onClick) {
      onClick(event);
    }
  };
  if (outsideCurrentMonth && !showDaysOutsideCurrentMonth) {
    return (0, import_jsx_runtime2.jsx)(PickersDayFiller, {
      className: clsx_default(classes.root, classes.hiddenDaySpacingFiller, className),
      ownerState,
      role: other.role
    });
  }
  return (0, import_jsx_runtime2.jsx)(PickersDayRoot, _extends({
    className: clsx_default(classes.root, className),
    ref: handleRef,
    centerRipple: true,
    disabled,
    tabIndex: selected ? 0 : -1,
    onKeyDown: (event) => onKeyDown(event, day),
    onFocus: (event) => onFocus(event, day),
    onBlur: (event) => onBlur(event, day),
    onMouseEnter: (event) => onMouseEnter(event, day),
    onClick: handleClick,
    onMouseDown: handleMouseDown
  }, other, {
    ownerState,
    children: !children ? utils.format(day, "dayOfMonth") : children
  }));
});
true ? PickersDayRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({
    current: import_prop_types.default.shape({
      focusVisible: import_prop_types.default.func.isRequired
    })
  })]),
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: import_prop_types.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  component: import_prop_types.default.elementType,
  /**
   * The date to show.
   */
  day: import_prop_types.default.object.isRequired,
  /**
   * If `true`, renders as disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types.default.bool,
  /**
   * If `true`, days are rendering without margin. Useful for displaying linked range of days.
   * @default false
   */
  disableMargin: import_prop_types.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: import_prop_types.default.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: import_prop_types.default.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: import_prop_types.default.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: import_prop_types.default.string,
  isAnimating: import_prop_types.default.bool,
  /**
   * If `true`, day is the first visible cell of the month.
   * Either the first day of the month or the first day of the week depending on `showDaysOutsideCurrentMonth`.
   */
  isFirstVisibleCell: import_prop_types.default.bool.isRequired,
  /**
   * If `true`, day is the last visible cell of the month.
   * Either the last day of the month or the last day of the week depending on `showDaysOutsideCurrentMonth`.
   */
  isLastVisibleCell: import_prop_types.default.bool.isRequired,
  onBlur: import_prop_types.default.func,
  onDaySelect: import_prop_types.default.func.isRequired,
  onFocus: import_prop_types.default.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: import_prop_types.default.func,
  onKeyDown: import_prop_types.default.func,
  onMouseEnter: import_prop_types.default.func,
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: import_prop_types.default.bool.isRequired,
  /**
   * If `true`, renders as selected.
   * @default false
   */
  selected: import_prop_types.default.bool,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types.default.bool,
  style: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * @default 0
   */
  tabIndex: import_prop_types.default.number,
  /**
   * If `true`, renders as today date.
   * @default false
   */
  today: import_prop_types.default.bool,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: import_prop_types.default.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({
    current: import_prop_types.default.shape({
      pulsate: import_prop_types.default.func.isRequired,
      start: import_prop_types.default.func.isRequired,
      stop: import_prop_types.default.func.isRequired
    })
  })])
} : void 0;
var PickersDay2 = React2.memo(PickersDayRaw);

// node_modules/@mui/x-date-pickers/DateCalendar/PickersSlideTransition.js
init_extends();
init_objectWithoutPropertiesLoose();
var React3 = __toESM(require_react());
init_clsx();
init_composeClasses();

// node_modules/@mui/x-date-pickers/DateCalendar/pickersSlideTransitionClasses.js
init_utils();
var getPickersSlideTransitionUtilityClass = (slot) => generateUtilityClass("MuiPickersSlideTransition", slot);
var pickersSlideTransitionClasses = generateUtilityClasses("MuiPickersSlideTransition", ["root", "slideEnter-left", "slideEnter-right", "slideEnterActive", "slideExit", "slideExitActiveLeft-left", "slideExitActiveLeft-right"]);

// node_modules/@mui/x-date-pickers/DateCalendar/PickersSlideTransition.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded2 = ["children", "className", "reduceAnimations", "slideDirection", "transKey", "classes"];
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    slideDirection
  } = ownerState;
  const slots = {
    root: ["root"],
    exit: ["slideExit"],
    enterActive: ["slideEnterActive"],
    enter: [`slideEnter-${slideDirection}`],
    exitActive: [`slideExitActiveLeft-${slideDirection}`]
  };
  return composeClasses(slots, getPickersSlideTransitionUtilityClass, classes);
};
var PickersSlideTransitionRoot = styled_default(TransitionGroup_default, {
  name: "MuiPickersSlideTransition",
  slot: "Root",
  overridesResolver: (_, styles) => [styles.root, {
    [`.${pickersSlideTransitionClasses["slideEnter-left"]}`]: styles["slideEnter-left"]
  }, {
    [`.${pickersSlideTransitionClasses["slideEnter-right"]}`]: styles["slideEnter-right"]
  }, {
    [`.${pickersSlideTransitionClasses.slideEnterActive}`]: styles.slideEnterActive
  }, {
    [`.${pickersSlideTransitionClasses.slideExit}`]: styles.slideExit
  }, {
    [`.${pickersSlideTransitionClasses["slideExitActiveLeft-left"]}`]: styles["slideExitActiveLeft-left"]
  }, {
    [`.${pickersSlideTransitionClasses["slideExitActiveLeft-right"]}`]: styles["slideExitActiveLeft-right"]
  }]
})(({
  theme
}) => {
  const slideTransition = theme.transitions.create("transform", {
    duration: theme.transitions.duration.complex,
    easing: "cubic-bezier(0.35, 0.8, 0.4, 1)"
  });
  return {
    display: "block",
    position: "relative",
    overflowX: "hidden",
    "& > *": {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0
    },
    [`& .${pickersSlideTransitionClasses["slideEnter-left"]}`]: {
      willChange: "transform",
      transform: "translate(100%)",
      zIndex: 1
    },
    [`& .${pickersSlideTransitionClasses["slideEnter-right"]}`]: {
      willChange: "transform",
      transform: "translate(-100%)",
      zIndex: 1
    },
    [`& .${pickersSlideTransitionClasses.slideEnterActive}`]: {
      transform: "translate(0%)",
      transition: slideTransition
    },
    [`& .${pickersSlideTransitionClasses.slideExit}`]: {
      transform: "translate(0%)"
    },
    [`& .${pickersSlideTransitionClasses["slideExitActiveLeft-left"]}`]: {
      willChange: "transform",
      transform: "translate(-100%)",
      transition: slideTransition,
      zIndex: 0
    },
    [`& .${pickersSlideTransitionClasses["slideExitActiveLeft-right"]}`]: {
      willChange: "transform",
      transform: "translate(100%)",
      transition: slideTransition,
      zIndex: 0
    }
  };
});
function PickersSlideTransition(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersSlideTransition"
  });
  const {
    children,
    className,
    reduceAnimations,
    transKey
    // extracting `classes` from `other`
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const classes = useUtilityClasses2(props);
  const theme = useTheme();
  if (reduceAnimations) {
    return (0, import_jsx_runtime3.jsx)("div", {
      className: clsx_default(classes.root, className),
      children
    });
  }
  const transitionClasses = {
    exit: classes.exit,
    enterActive: classes.enterActive,
    enter: classes.enter,
    exitActive: classes.exitActive
  };
  return (0, import_jsx_runtime3.jsx)(PickersSlideTransitionRoot, {
    className: clsx_default(classes.root, className),
    childFactory: (element) => React3.cloneElement(element, {
      classNames: transitionClasses
    }),
    role: "presentation",
    children: (0, import_jsx_runtime3.jsx)(CSSTransition_default, _extends({
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: theme.transitions.duration.complex,
      classNames: transitionClasses
    }, other, {
      children
    }), transKey)
  });
}

// node_modules/@mui/x-date-pickers/DateCalendar/useIsDateDisabled.js
var React4 = __toESM(require_react());

// node_modules/@mui/x-date-pickers/DateCalendar/dayCalendarClasses.js
init_utils();
var dayCalendarClasses = generateUtilityClasses("MuiDayCalendar", ["root", "header", "weekDayLabel", "loadingContainer", "slideTransition", "monthContainer", "weekContainer", "weekNumberLabel", "weekNumber"]);

// node_modules/@mui/x-date-pickers/DateCalendar/DayCalendar.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 2) * 6;
var PickersCalendarDayRoot = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})({});
var PickersCalendarDayHeader = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "Header",
  overridesResolver: (_, styles) => styles.header
})({
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});
var PickersCalendarWeekDayLabel = styled_default(Typography_default, {
  name: "MuiDayCalendar",
  slot: "WeekDayLabel",
  overridesResolver: (_, styles) => styles.weekDayLabel
})(({
  theme
}) => ({
  width: 36,
  height: 40,
  margin: "0 2px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: (theme.vars || theme).palette.text.secondary
}));
var PickersCalendarWeekNumberLabel = styled_default(Typography_default, {
  name: "MuiDayCalendar",
  slot: "WeekNumberLabel",
  overridesResolver: (_, styles) => styles.weekNumberLabel
})(({
  theme
}) => ({
  width: 36,
  height: 40,
  margin: "0 2px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.text.disabled
}));
var PickersCalendarWeekNumber = styled_default(Typography_default, {
  name: "MuiDayCalendar",
  slot: "WeekNumber",
  overridesResolver: (_, styles) => styles.weekNumber
})(({
  theme
}) => _extends({}, theme.typography.caption, {
  width: DAY_SIZE,
  height: DAY_SIZE,
  padding: 0,
  margin: `0 ${DAY_MARGIN}px`,
  color: theme.palette.text.disabled,
  fontSize: "0.75rem",
  alignItems: "center",
  justifyContent: "center",
  display: "inline-flex"
}));
var PickersCalendarLoadingContainer = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "LoadingContainer",
  overridesResolver: (_, styles) => styles.loadingContainer
})({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: weeksContainerHeight
});
var PickersCalendarSlideTransition = styled_default(PickersSlideTransition, {
  name: "MuiDayCalendar",
  slot: "SlideTransition",
  overridesResolver: (_, styles) => styles.slideTransition
})({
  minHeight: weeksContainerHeight
});
var PickersCalendarWeekContainer = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "MonthContainer",
  overridesResolver: (_, styles) => styles.monthContainer
})({
  overflow: "hidden"
});
var PickersCalendarWeek = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "WeekContainer",
  overridesResolver: (_, styles) => styles.weekContainer
})({
  margin: `${DAY_MARGIN}px 0`,
  display: "flex",
  justifyContent: "center"
});

// node_modules/@mui/x-date-pickers/DateCalendar/useCalendarState.js
init_extends();
var React6 = __toESM(require_react());
init_useEventCallback();

// node_modules/@mui/x-date-pickers-pro/SingleInputTimeRangeField/SingleInputTimeRangeField.js
init_utils();

// node_modules/@mui/x-date-pickers-pro/SingleInputTimeRangeField/useSingleInputTimeRangeField.js
var React7 = __toESM(require_react());

// node_modules/@mui/x-date-pickers-pro/internals/utils/valueManagers.js
init_extends();
init_objectWithoutPropertiesLoose();

// node_modules/@mui/x-date-pickers-pro/internals/utils/date-fields-utils.js
init_extends();
var splitDateRangeSections = (sections) => {
  const startDateSections = [];
  const endDateSections = [];
  sections.forEach((section) => {
    if (section.dateName === "start") {
      startDateSections.push(section);
    } else {
      endDateSections.push(section);
    }
  });
  return {
    startDate: startDateSections,
    endDate: endDateSections
  };
};
var removeLastSeparator = (dateSections) => dateSections.map((section, sectionIndex) => {
  if (sectionIndex === dateSections.length - 1) {
    return _extends({}, section, {
      separator: null
    });
  }
  return section;
});

// node_modules/@mui/x-date-pickers-pro/internals/utils/valueManagers.js
var _excluded3 = ["value", "referenceDate"];
var rangeValueManager = {
  emptyValue: [null, null],
  getTodayValue: (utils, timezone, valueType) => [getTodayDate(utils, timezone, valueType), getTodayDate(utils, timezone, valueType)],
  getInitialReferenceValue: (_ref) => {
    let {
      value,
      referenceDate: referenceDateProp
    } = _ref, params = _objectWithoutPropertiesLoose(_ref, _excluded3);
    const shouldKeepStartDate = value[0] != null && params.utils.isValid(value[0]);
    const shouldKeepEndDate = value[1] != null && params.utils.isValid(value[1]);
    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }
    const referenceDate = referenceDateProp ?? getDefaultReferenceDate(params);
    return [shouldKeepStartDate ? value[0] : referenceDate, shouldKeepEndDate ? value[1] : referenceDate];
  },
  cleanValue: (utils, value) => value.map((date) => replaceInvalidDateByNull(utils, date)),
  areValuesEqual: (utils, a, b) => areDatesEqual(utils, a[0], b[0]) && areDatesEqual(utils, a[1], b[1]),
  isSameError: (a, b) => b !== null && a[1] === b[1] && a[0] === b[0],
  hasError: (error) => error[0] != null || error[1] != null,
  defaultErrorState: [null, null],
  getTimezone: (utils, value) => {
    const timezoneStart = value[0] == null || !utils.isValid(value[0]) ? null : utils.getTimezone(value[0]);
    const timezoneEnd = value[1] == null || !utils.isValid(value[1]) ? null : utils.getTimezone(value[1]);
    if (timezoneStart != null && timezoneEnd != null && timezoneStart !== timezoneEnd) {
      throw new Error("MUI X: The timezone of the start and the end date should be the same.");
    }
    return timezoneStart ?? timezoneEnd;
  },
  setTimezone: (utils, timezone, value) => [value[0] == null ? null : utils.setTimezone(value[0], timezone), value[1] == null ? null : utils.setTimezone(value[1], timezone)]
};
var getRangeFieldValueManager = ({
  dateSeparator = "–"
}) => ({
  updateReferenceValue: (utils, value, prevReferenceValue) => {
    const shouldKeepStartDate = value[0] != null && utils.isValid(value[0]);
    const shouldKeepEndDate = value[1] != null && utils.isValid(value[1]);
    if (!shouldKeepStartDate && !shouldKeepEndDate) {
      return prevReferenceValue;
    }
    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }
    if (shouldKeepStartDate) {
      return [value[0], prevReferenceValue[0]];
    }
    return [prevReferenceValue[1], value[1]];
  },
  getSectionsFromValue: (utils, [start, end], fallbackSections, getSectionsFromDate) => {
    const separatedFallbackSections = fallbackSections == null ? {
      startDate: null,
      endDate: null
    } : splitDateRangeSections(fallbackSections);
    const getSections = (newDate, fallbackDateSections, position) => {
      const shouldReUsePrevDateSections = !utils.isValid(newDate) && !!fallbackDateSections;
      if (shouldReUsePrevDateSections) {
        return fallbackDateSections;
      }
      const sections = getSectionsFromDate(newDate);
      return sections.map((section, sectionIndex) => {
        if (sectionIndex === sections.length - 1 && position === "start") {
          return _extends({}, section, {
            dateName: position,
            // TODO: Check if RTL still works
            endSeparator: `${section.endSeparator} ${dateSeparator} `
          });
        }
        return _extends({}, section, {
          dateName: position
        });
      });
    };
    return [...getSections(start, separatedFallbackSections.startDate, "start"), ...getSections(end, separatedFallbackSections.endDate, "end")];
  },
  getV7HiddenInputValueFromSections: (sections) => {
    const dateRangeSections = splitDateRangeSections(sections);
    return createDateStrForV7HiddenInputFromSections([...dateRangeSections.startDate, ...dateRangeSections.endDate]);
  },
  getV6InputValueFromSections: (sections, localizedDigits, isRtl) => {
    const dateRangeSections = splitDateRangeSections(sections);
    return createDateStrForV6InputFromSections([...dateRangeSections.startDate, ...dateRangeSections.endDate], localizedDigits, isRtl);
  },
  parseValueStr: (valueStr, referenceValue, parseDate) => {
    const [startStr, endStr] = valueStr.split(dateSeparator);
    return [startStr, endStr].map((dateStr, index) => {
      if (dateStr == null) {
        return null;
      }
      return parseDate(dateStr.trim(), referenceValue[index]);
    });
  },
  getActiveDateManager: (utils, state, activeSection) => {
    const index = activeSection.dateName === "start" ? 0 : 1;
    const updateDateInRange = (newDate, prevDateRange) => index === 0 ? [newDate, prevDateRange[1]] : [prevDateRange[0], newDate];
    return {
      date: state.value[index],
      referenceDate: state.referenceValue[index],
      getSections: (sections) => {
        const dateRangeSections = splitDateRangeSections(sections);
        if (index === 0) {
          return removeLastSeparator(dateRangeSections.startDate);
        }
        return dateRangeSections.endDate;
      },
      getNewValuesFromNewActiveDate: (newActiveDate) => ({
        value: updateDateInRange(newActiveDate, state.value),
        referenceValue: newActiveDate == null || !utils.isValid(newActiveDate) ? state.referenceValue : updateDateInRange(newActiveDate, state.referenceValue)
      })
    };
  }
});

// node_modules/@mui/x-date-pickers-pro/internals/utils/date-utils.js
var isRangeValid = (utils, range) => {
  return Boolean(range && range[0] && range[1] && !utils.isBefore(range[1], range[0]));
};

// node_modules/@mui/x-date-pickers-pro/internals/utils/validation/validateTimeRange.js
var validateTimeRange = ({
  props,
  value,
  adapter
}) => {
  const [start, end] = value;
  const dateTimeValidations = [validateTime({
    adapter,
    value: start,
    props
  }), validateTime({
    adapter,
    value: end,
    props
  })];
  if (dateTimeValidations[0] || dateTimeValidations[1]) {
    return dateTimeValidations;
  }
  if (start === null || end === null) {
    return [null, null];
  }
  if (!isRangeValid(adapter.utils, value)) {
    return ["invalidRange", "invalidRange"];
  }
  return [null, null];
};

// node_modules/@mui/x-date-pickers-pro/SingleInputTimeRangeField/useSingleInputTimeRangeField.js
var useSingleInputTimeRangeField = (inProps) => {
  const props = useDefaultizedTimeField(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, "time");
  const fieldValueManager = React7.useMemo(() => getRangeFieldValueManager({
    dateSeparator: internalProps.dateSeparator
  }), [internalProps.dateSeparator]);
  return useField({
    forwardedProps,
    internalProps,
    valueManager: rangeValueManager,
    fieldValueManager,
    validator: validateTimeRange,
    valueType: "time"
  });
};

// node_modules/@mui/x-date-pickers-pro/SingleInputTimeRangeField/SingleInputTimeRangeField.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var _excluded4 = ["slots", "slotProps", "InputProps", "inputProps"];
var SingleInputTimeRangeField = React8.forwardRef(function SingleInputTimeRangeField2(inProps, inRef) {
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiSingleInputTimeRangeField"
  });
  const {
    slots,
    slotProps,
    InputProps,
    inputProps
  } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded4);
  const ownerState = themeProps;
  const TextField = (slots == null ? void 0 : slots.textField) ?? (inProps.enableAccessibleFieldDOMStructure ? PickersTextField : TextField_default);
  const textFieldProps = useSlotProps({
    elementType: TextField,
    externalSlotProps: slotProps == null ? void 0 : slotProps.textField,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      ref: inRef
    }
  });
  textFieldProps.inputProps = _extends({}, inputProps, textFieldProps.inputProps);
  textFieldProps.InputProps = _extends({}, InputProps, textFieldProps.InputProps);
  const fieldResponse = useSingleInputTimeRangeField(textFieldProps);
  const convertedFieldResponse = convertFieldResponseIntoMuiTextFieldProps(fieldResponse);
  const processedFieldProps = useClearableField(_extends({}, convertedFieldResponse, {
    slots,
    slotProps
  }));
  return (0, import_jsx_runtime5.jsx)(TextField, _extends({}, processedFieldProps));
});
SingleInputTimeRangeField.fieldType = "single-input";
true ? SingleInputTimeRangeField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * 12h/24h view for hour selection clock.
   * @default utils.is12HourCycleInCurrentLocale()
   */
  ampm: import_prop_types2.default.bool,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: import_prop_types2.default.bool,
  className: import_prop_types2.default.string,
  /**
   * If `true`, a clear button will be shown in the field allowing value clearing.
   * @default false
   */
  clearable: import_prop_types2.default.bool,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: import_prop_types2.default.oneOf(["error", "info", "primary", "secondary", "success", "warning"]),
  component: import_prop_types2.default.elementType,
  /**
   * String displayed between the start and the end dates.
   * @default "–"
   */
  dateSeparator: import_prop_types2.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types2.default.arrayOf(import_prop_types2.default.object),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types2.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types2.default.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: import_prop_types2.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types2.default.bool,
  /**
   * @default false
   */
  enableAccessibleFieldDOMStructure: import_prop_types2.default.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: import_prop_types2.default.bool,
  /**
   * Format of the date when rendered in the input(s).
   */
  format: import_prop_types2.default.string,
  /**
   * Density of the format when rendered in the input.
   * Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
   * @default "dense"
   */
  formatDensity: import_prop_types2.default.oneOf(["dense", "spacious"]),
  /**
   * Props applied to the [`FormHelperText`](/material-ui/api/form-helper-text/) element.
   */
  FormHelperTextProps: import_prop_types2.default.object,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: import_prop_types2.default.bool,
  /**
   * The helper text content.
   */
  helperText: import_prop_types2.default.node,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: import_prop_types2.default.bool,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: import_prop_types2.default.string,
  /**
   * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   */
  InputLabelProps: import_prop_types2.default.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: import_prop_types2.default.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: import_prop_types2.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * The label content.
   */
  label: import_prop_types2.default.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: import_prop_types2.default.oneOf(["dense", "none", "normal"]),
  /**
   * Maximal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  maxTime: import_prop_types2.default.object,
  /**
   * Minimal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  minTime: import_prop_types2.default.object,
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: import_prop_types2.default.number,
  /**
   * Name attribute of the `input` element.
   */
  name: import_prop_types2.default.string,
  onBlur: import_prop_types2.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types2.default.func,
  /**
   * Callback fired when the clear button is clicked.
   */
  onClear: import_prop_types2.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error.
   * @param {TValue} value The value associated to the error.
   */
  onError: import_prop_types2.default.func,
  onFocus: import_prop_types2.default.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: import_prop_types2.default.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   * @default false
   */
  readOnly: import_prop_types2.default.bool,
  /**
   * The date used to generate a part of the new value that is not present in the format when both `value` and `defaultValue` are empty.
   * For example, on time fields it will be used to determine the date to set.
   * @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`. Value is rounded to the most granular section used.
   */
  referenceDate: import_prop_types2.default.object,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: import_prop_types2.default.bool,
  /**
   * The currently selected sections.
   * This prop accepts four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 3. If `"all"` is provided, all the sections will be selected.
   * 4. If `null` is provided, no section will be selected.
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: import_prop_types2.default.oneOfType([import_prop_types2.default.oneOf(["all", "day", "empty", "hours", "meridiem", "minutes", "month", "seconds", "weekDay", "year"]), import_prop_types2.default.number]),
  /**
   * Disable specific time.
   * @template TDate
   * @param {TDate} value The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   */
  shouldDisableTime: import_prop_types2.default.func,
  /**
   * If `true`, the format will respect the leading zeroes (e.g: on dayjs, the format `M/D/YYYY` will render `8/16/2018`)
   * If `false`, the format will always add leading zeroes (e.g: on dayjs, the format `M/D/YYYY` will render `08/16/2018`)
   *
   * Warning n°1: Luxon is not able to respect the leading zeroes when using macro tokens (e.g: "DD"), so `shouldRespectLeadingZeros={true}` might lead to inconsistencies when using `AdapterLuxon`.
   *
   * Warning n°2: When `shouldRespectLeadingZeros={true}`, the field will add an invisible character on the sections containing a single digit to make sure `onChange` is fired.
   * If you need to get the clean value from the input, you can remove this character using `input.value.replace(/\u200e/g, '')`.
   *
   * Warning n°3: When used in strict mode, dayjs and moment require to respect the leading zeros.
   * This mean that when using `shouldRespectLeadingZeros={false}`, if you retrieve the value directly from the input (not listening to `onChange`) and your format contains tokens without leading zeros, the value will not be parsed by your library.
   *
   * @default false
   */
  shouldRespectLeadingZeros: import_prop_types2.default.bool,
  /**
   * The size of the component.
   */
  size: import_prop_types2.default.oneOf(["medium", "small"]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types2.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types2.default.object,
  style: import_prop_types2.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types2.default.string,
  /**
   * The ref object used to imperatively interact with the field.
   */
  unstableFieldRef: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object]),
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types2.default.arrayOf(import_prop_types2.default.object),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: import_prop_types2.default.oneOf(["filled", "outlined", "standard"])
} : void 0;
export {
  SingleInputTimeRangeField,
  useSingleInputTimeRangeField as unstable_useSingleInputTimeRangeField
};
//# sourceMappingURL=@mui_x-date-pickers-pro_SingleInputTimeRangeField.js.map
