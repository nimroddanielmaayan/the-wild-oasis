# React - General Notes

## React Basics

- The most important concepts in React are: Components, props, state, and hooks

- Hooks are a way of easily accessing the lower-level features of React. We can
  think about them as similar to low level primitives in vanilla JS (like
  strings, numbers, etc.)

- Hooks can only be called at the top level of a component. Only when building
  custom hooks, we can call hooks inside other functions

- Custom hooks are just regular functions that call or combine other hooks

### A concise summary of React hooks

Basic Hooks

- useState - for basic state management
- useEffect - for hooking onto component lifecycle events. Components have 3
  lifecycle events: Mount, update, unmount. useEffect can be used to hook onto
  any of these events (mount -> empty dependency, update -> updated dependency,
  unmount -> return function)
- useContext - for context management (global state)

Additional Hooks

- useRef - for creating mutible values, that we can later decide when to trigger
  a UI update (by using the useEffect hook). Also, it can be used for DOM refs
  like triggering focus or a click
- useReducer - similar to state, but for more complex state management like
  Redux which uses reducers
- useMemo - for memoization of values, which is a way of caching values so that
  we don't need to recompute them every time. It's recommended to use it only
  when optimizing performance
- useCallback - for memoization of functions. It's recommended to use it only
  when optimizing performance
- useImperativeHandle - Rarely used. For exposing imperative API to parent
  components (exposed by useRef)
- useLayoutEffect - Rarely used. Similar to useEffect, but runs synchronously
  after all DOM mutations (It will wait for the DOM to be updated before
  running)
- useDebugValue - for debugging custom hooks. It will define a label for the
  custom hook in the React DevTools

## The Wild Oasis Project

### SupaBase - Our Database

- In relational databases, the foreign key relation needs to be placed in the
  table that is "more limited". For example: If a cabin can have as many
  bookings as we want, but every booking can involve only one cabbin, then the
  bookings table is the one that should contain the foreign key

- It's important to notice "row level security" rules in SupaBase. If there is
  no permission to access a certain row in a certain way, nothing that we will
  do in the application will work

### React Query

- React Query is the most popular querying tool for React today, even more than
  the "official" react querying tool (Redux)

- One of the most important differences between local state and remote state is
  that remote state is shared by many different users and admins - so different
  users\instances of the app can easily get out of sync with each other. React
  Query helps us with that

### React Hook Form

- A library that really helps us with forms in React. It saves us from writing a
  lot of boilerplate code like variables for each input, onChange handlers, etc.
  It also has a lot of built-in validation tools
