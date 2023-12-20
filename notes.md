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

## React Testing

- Testing without testing libraries is called "manual testing". Testing with
  testing libraries is called "automated testing"

- Knowing testing is important for all developers, but especially for junior and
  mid-level developers, since it's an important skill that is often required by
  employers\clients and it also helps us learn to write better code

- The importance of automated testing comes from several aspects: First of all,
  it helps us be more confident in our code and in our application. It also
  helps in saving time, debugging, documenting, collaborating, planning (by
  using TDD), and more

- A "test suite" is a collection of tests, collected in a single file or folder

- Tests are just regular functions, structured for a specific purpose

- There are several popular testing libraries for React: React Testing Library,
  Jest, Vitest (For Vite, which is almost identical to Jest), Cypress, Enzyme,
  Storybook, and more. Some of these libraries complete each other, and some of
  them are alternatives to each other

- When using Vite as a bundler, it's much easier to use Vitest instead of Jest,
  and the syntax is almost identical

- The most popular way to test React components is by using React Testing
  Library and Jest together. This is the combination that the React team
  recommends. Jest is maintained by Meta

- Jest is a general purpose JS testing library, and React Testing Library is
  specific for React. First, the React Testing Library renders components to a
  simulated DOM and makes it available. Then, a test runner like Jest can find
  tests, run them, make assertions, and report the results

- Cypress is a testing library which is different from the others because it
  runs the tests in a real browser, with a graphical interface and a lot of
  functionalities like recording videos, taking screenshots, etc. It's very
  useful for end-to-end testing and makes the testing process much more visual,
  interactive, and easy to understand. It's best used for end-to-end testing but
  it can also be used for integration and unit testing

- Testing is an especially good opportunity to use AI, which can help us a lot
  with coming up with test cases, writing tests, and running tests. Testing is
  very structured and that's a thing that AI is good in. We can prompt the AI
  what exactly we want to test and get suggestions on how to do it

- To create a test file, simply create a file with the same name as the file
  that you want to test, and add `.test` to the end of the file name. For
  example: `App.js` -> `App.test.js`

- A test will only fail if an error is thrown. So if a component throws an
  error, the test will fail even if there's no assertion. If an assertion exists
  and it's expectation fails, it will throw it's own error, and the test will
  fail

- In other words: If we run an empty test it will always pass, unless the
  component has some bug and throws an error on it's own

- In some testing libraries, it's possible to output the results of the tests to
  an HTML file and view them in the browser. This can be very convenient

- Some important React testing concepts:

  - Unit testing (testing a single unit of code)
  - integration testing (testing how several connected units of code work
    together)
  - end-to-end testing (testing the entire application)
  - Simulated DOM
  - Assertions
  - Mocking
  - Test driven development (TDD): Writing the tests before writing the code
    itself
  - Test coverage: How much of the code is covered by the tests
  - Async testing
  - Snapshot testing
  - Arrange, act, assert

- Some of the most important things that we want to test in React are
  - Rendering
  - State changes
  - User interactions: Common user actions, core\high value actions, edge cases

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
