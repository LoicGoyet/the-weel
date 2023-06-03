import React from 'react';

type State<P extends string = 'name'> = {
  values: Record<P, string>;
  errors: Record<P, string>;
  touched: Record<P, boolean>;
};

type Action =
  | {type: 'SET_VALUE'; payload: {property: string; value: string}}
  | {type: 'SET_ALL_TOUCHED'}
  | {type: 'RESET'};

const initialState: State = {
  values: {
    name: '',
  },
  errors: {
    name: 'Required',
  },
  touched: {
    name: false,
  },
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_VALUE': {
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.property]: action.payload.value,
        },
        touched: {
          ...state.touched,
          [action.payload.property]: true,
        },
        errors: {
          ...state.errors,
          [action.payload.property]: !action.payload.value.trim() ? 'Required' : '',
        },
      };
    }
    case 'SET_ALL_TOUCHED': {
      return {
        ...state,
        touched: Object.keys(state.touched).reduce((acc, key) => {
          return {
            ...acc,
            [key]: true,
          };
        }, state.touched),
      };
    }

    case 'RESET': {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export const useForm = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const updateValue = React.useCallback(
    (property: 'name', value: string) => {
      dispatch({type: 'SET_VALUE', payload: {property, value}});
    },
    [dispatch],
  );

  const hasErrors = React.useMemo(() => {
    return Object.values(state.errors).some(error => error);
  }, [state.errors]);

  const setAllTouched = React.useCallback(() => {
    dispatch({type: 'SET_ALL_TOUCHED'});
  }, [dispatch]);

  const reset = React.useCallback(() => {
    dispatch({type: 'RESET'});
  }, [dispatch]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    updateValue,
    hasErrors,
    setAllTouched,
    reset,
  };
};
