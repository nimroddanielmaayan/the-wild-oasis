# The React Library and Related Subjects - General Notes

## React Basics and React Hooks

### React Basic Concepts

- The most important concepts in React are: `Components`, `props`, `state`, and
  `hooks`

- `Hooks` are a way of easily accessing the lower-level features of React. We
  can think about them as similar to low level primitives in vanilla JS (like
  strings, numbers, etc.)

- `Hooks` can only be called at the top level of a component. Only when building
  custom `hooks`, we can call `hooks` inside other functions

- Custom `hooks` are just regular functions that call or combine other `hooks`

### The React State Update Cycle

- Whenever a state change happens, a state update cycle starts

- The React `virtual DOM` is actually just a simple JS object. That's why it's
  so "cheap" (in computing terms) to create and update iterations of it

- It's important to know that any state change in a component will cause the
  virtual DOM to re-render not only that component, but also all of it's child
  components. This is because React is "playing it safe", since it doesn't know
  if changes will happen in the child components as well. This is usually not a
  problem since updating the virtual DOM is "cheap", but there are advanced
  methods to make this process even more efficient, like `refs`

- When there's a state change, the processes of `reconciliation` and `diffing`
  are triggered. That's how React decides what changes need to be made to the
  DOM. After that, these changes are `commited` to the DOM

- The library that commits to the DOM is called `ReactDOM`. The "regular" React
  library itself never touches the actual DOM. `ReactDOM` is only one of many
  `React renderers`. Other `React renderers` include `React Native`, `Remotion`
  and others. Actually, a better name would have been "React commiters", but the
  term "renderers" is used because of historical reasons

- Unlike React, `ReactDOM` works synchroneously - which means that all the
  actual DOM updates are made in one go

- The `fiber tree` is a sort of "mid phase" between the virtual DOM and the
  actual DOM. React uses the `fiber tree` to decide how to update the actual DOM
  in the most efficient way possible

- The browser itself has a "browser paint" phase, in which it notices that
  changes were made to the DOM and then it paints them (updates the on-screen
  UI). This phase is the same for all front-end JS libraries

- The `key` prop is an especially important React prop, since it tells the
  diffing algorithem that an element is unique and not generic. That way React
  knows to track changes to that element according to it's `key` and not
  according to it's location in the DOM or other attributes

- The 2 main practical use cases of `keys` are:

  - In lists ("stable key")
  - As a trigger to change state (new `key` -> new state). For example, if the
    only change in the element is a prop change, which won't trigger a
    re-render, we also need to change the element's key (so that react will
    understand that we do want to update the DOM). This is less common than the
    first use case, but it still happens sometimes

- The concept of `pure functions`: Functions that have no interaction with the
  outside world and that will always return the same value, given a certain
  input. `pure components` are a similar concept. The `render logic` part of a
  React component must always be "pure", since it must create a predictable UI,
  no matter what variables it recieves. `Event handler functions` and any other
  code parts of a component, on the other hand, don't need to be "pure" since
  their purpose is usually to interact with the outside world. This separation
  is an important principle in React

- One common example of why the `render logic` must be "pure": If we try to
  update the `state` or a `ref` (both are side effects) inside of the render
  logic, we'll get the famous "React infinite loop"! Another example is the fact
  that `props` are not mutatable, since they are part of the `render logic`

- The concept of `stale state`: Because React doesn't update state immediately,
  but only after a few milliseconds, we might get a situation where the state
  was output to somewhere (like to a console.log) and is udated a few
  milliseconds later. In this case we say that the output is "stale" or "not
  refreshed"

- Because of `stale state`, in order to set state based on a previous state we
  use a callback function (in which a common practice it to use the term
  prevState)

### React as a Library (in contrast to a framework)

- The main difference between a JS library and a JS framework, is that a library
  is modular and a framework has all the parts included. Since React is a
  library, almost all applications using it need react-based third-party
  libraries for advanced functionalities like routing, state management, forms,
  styling, etc. For each React project, we need to mix-and-match the libraries
  that we will use (this is also called "setup work"). This gives us more
  freedom, but it's risks are decision fatigue and the possibility of making
  mistakes

- `Next.js`, `Remix` and `Gatsby` (amongst others) are actually not third-party
  libraries, but `React-based frameworks` (similar to `Angular` and `Vue`). Even
  though they are based on React they include all the functionalities that a web
  app needs, and they are opinionated. Also, React is just front-end, while
  these frameworks also cover back-end operations, making them
  `full stack frameworks`

### A Concise Summary of React Hooks

Basic `Hooks`:

- `useState` - for basic state management
- `useEffect` - for hooking onto component lifecycle events
- `useContext` - an option for context management ("global state")

Additional `Hooks`:

- IMPORTANT NOTE: The `useMemo`, `useCallback` and `memo` hooks were made
  obsolete by the "React compiler" in React version 19. It's still good to know
  about them in general, though

- `useRef` - for creating updatable, mutible, stable variables (similar to
  "regular" variables in JS)
- `useReducer` - similar to state, but more advanced
- `useMemo` - for memoization of values, which is a way of caching values so
  that we don't need to recompute them every time (made obsolete by the "React
  compiler")
- `useCallback` - for memoization of functions (made obsolete by the "React
  compiler")
- `useImperativeHandle` - Rarely used. For exposing imperative API to parent
  components (exposed by useRef)
- `useLayoutEffect` - Rarely used. Similar to useEffect, but runs synchronously
  after all DOM mutations, and just before the browser paint
- `useDebugValue` - for debugging custom hooks. It will define a label for the
  custom hook in the React DevTools

### More about `useState`

- State is updated asynchronously, so the new state is not available immediately
  after the `setState` function is called. Such unupdated state is often called
  "stale state"

### More about `useEffect`

- `useEffect` is made of 3 parts: The effect, a cleanup function (optional) and
  the dependency array. All components have 3 lifecycle events: `Mount`,
  `update`, and `unmount`. We can use`useEffect` to hook onto any of these
  events:
  - `mount` -> an empty dependency array
  - `update` -> dependency\ies in the dependency array
  - `unmount` -> a cleanup function in the dependency array

### More about `useRef`

- Refs (or "references") are like regular (non-React) variables. They don't
  trigger a UI update on change

- The 3 main use cases for refs are:

  - Consistent values (like IDs), values that are not displayed on-screen
  - selecting\storing DOM elements

- Every ref has a `.current` property, which is the actual value of the ref.

- Why `useRef` and not `let`? Because in a functional component `let` gets reset
  on every render

- `useRef` is updated synchronously, so it's never "stale"

### More about `useContext`

- The `useContext` hook in React allows us to share data between components
  without passing props manually at every level

- It's only one of several ways to centralise data management in React. Other
  popular ways are `context API`, `Redux`, `Zustand`, etc.

- To use `useContext`, we need to create a context using the `createContext`
  function. It takes the context object as an argument and returns the current
  value of the context.

### More about `useReducer`

- `useReducer` is like "`useState` with superpowers"

- It takes 2 arguments: a reducer function and an inital state. The reducer
  function then also takes 2 arguments: the state and an action, and it can be
  defined to do anything we want, Like add or subtract from the state, do things
  based on conditions, etc

- It's common to dispatch (as an action) an object with a `type` and a `payload`
  property

- It's useful for complex state management. It's used a lot in Redux and other
  state management libraries, but can also be used withput them. Theoretically,
  other hooks can do what `useReducer` does, but `useReducer` is a much more
  efficient way of doing it

### Other general notes on `Hooks`

- Hooks can only be called at the top level of a component, and only inside
  React functions

- In React, There are 2 ways of creating `effects` (actually making something
  usefull happen in the application): `event handlers` and `useEffect`

- The job of `event handlers` is to synch the application to events, and they
  are the "preferred"\"default" way of creating `effects`

- The job of the `useEffect` hook is to synch the application to external
  systems (such as an external API)

- The `cleanup function` in `useEffect` is optional, and it's executed on 2
  occasions:

  - when the component is unmounted
  - before the effect is run again

- A good example of a `cleanup function` is in HTTP requests. for example: The
  user requests data by clicking a button, and then clicks a different button to
  request different data before the first data is loaded. In this case, the
  first request should be canceled in order to save resources

- Other examples of `cleanup functions`:

  - Cancel API subscriptions
  - Stop timers
  - Remove event listeners

- Every `useEffect` should only handel one effect (this is not a "hard rule",
  just a good practice). If we need to handle multiple effects, we should use
  multiple `useEffect` hooks

- Every `useEffect` runs on `mount`, even if it has dependencies

- A single `useEffect` can run on all 3 events (`mount`, `update` and `unmount`)

- To run `useEffect` on EVERY state change, we can use it with no dependency
  array. This is not recommended and rarely done

- It's important to remove event listeners in the `cleanup function` of
  `useEffect` hooks, otherwise a new event listener will be added every time the
  component is re-rendered

- Since React 18, if React is in strict mode and we call a `useEffect` hook
  during development, React will run the effect once for every function within
  the hook. This might cause repeated console.logs and other strange behaviours
  (that can be ignored). In production, the effect will run only once

- It's always important to add `error handling` wherever errors might occur

- The `React DevTools` are a very important tool for debugging React
  applications. In addition, there are devtools for `React Query`, `Redux`, and
  other popular React libraries

- Lesson 187 ("Yet Another Hook: useReducer") and lesson 189 ("Managing State
  With useReducer") have the best explanations of `useReducer` that I've seen so
  far

- A "reducer" is called as such because it usually "reduces" several possible
  inputs into a single output, according to it's conditions

- One of the main advantages of `useReducer` is that it concentrates all the
  logic of the state in one place. This lets us decouple the state logic from
  the component, making the components much leaner

- "reducers" must be pure functions, and they must always return a new state

### Custom Hooks

- `Custom hooks` are just a combination of existing hooks. One of their main
  benefits is for easily reusing non-visual\non-UI logic

- A `custom hook` is just a "regular" function that must start with the word
  `use` (like "useFetch") and contains other hooks. `Custom hooks` usually
  recieve and return data (they usually return an array or an object)

- It's not possible to create "regular" reusable functions that use hooks. This
  is because hooks can only be called inside React functions

- Like a reusable function, a reusable custom hook should have only one purpose
  and should be as reusable as possible

- `Custom hooks` are a way to abstract a lot of complex logic into one simple,
  reusable hook

## Routing, React Router and SPAs

### General

- `React Router` is the most popular routing library for React

- SPAs (Single Page Applications) are web applications that load a single HTML
  file and dynamically update the page as the user interacts with the app

- Note: In Next.js, routing is built-in and doesn't require a separate library
  like React Router. It's done differently than in simple SPAs

- The main components of `React Router` are - `BrowserRouter`, `Route`, `Link`,
  and `Switch`:

  - The `BrowserRouter` component is the root component of the router. It uses
    the HTML5 history API to keep the UI in sync with the URL

  - The `Route` component is used to render a component based on the URL

  - The `Link` component is used to navigate between different routes

  - The `Switch` component is used to render the first child `Route` or
    `Redirect` that matches the location

- `useNavigate` is a hook that's specific to `React Router`. It returns a
  navigate function that can be used to navigate to a different route

- Storing state in the URL: Why would we want to store state inside the URL and
  not in memory? Mainly because it makes the app more shareable and
  bookmarkable.

### Data Loading in React Router (version 6.4 and above)

- Since version 6.4, `React Router` added a new feature called `data loading`.
  This allows us to load data before rendering a route - an approach called
  "render as you fetch" (rather than "fetch as you render").

- `Data loading` is convienient because it allows us to load data before the
  component is rendered in a very straightforward way. Rather than rendering,
  loading data and then re-rendering, we can just render the component once

- `Data loading` doesn't replace full remote state management libraries, because
  it can only fetch the remote data. It can't send data back to the server

- In case of a project that has complex remote state management, it's
  recommended to use a full remote state management library like `React Query`
  for all remote fetching and sending. `React Router`'s `Data loading` is mainly
  for simple cases\projects

## Redux and Redux Toolkit

### Introduction to Redux

- `Redux` is a very popular 3rd party library for managing global state in
  React. There are other similar libraries like `Zustand`, `Recoil`, `MobX`, and
  more

- All global state is stored in a single globally accessible store. This store
  is updated using `actions`

- There are 2 versions of `Redux` - the `classic Redux` and
  `modern Redux toolkit`. Almost all new projects use the `modern Redux toolkit`

- Understanding the `useReducer` hook is crucial for understanding `Redux`. The
  word "Redux" itself comes from the word "reducer"

- Reminder: a `reducer` is a pure function that takes the previous state, and an
  action, and "reduces" all the possible next states into one desired next
  state, according to the rules we define

- `Redux` in nutoriously hard to learn, but that means that knowing it is very
  valuable. Also, similar global state management libraries have very similar
  principles. This is why knowing `Redux` is important even though not all React
  projects require it

- `RTK Query` (React ToolKit Query) is a library that is part of the
  `Redux Toolkit`. It's used for making API requests and managing the state of
  the data that comes back from the API\backend. It's an alternative to other
  backend-querying libraries like `React Query`

- In a lot of modern web applications all global state is remote, so that it's
  always saved under the use's profile and never lost. This is called
  `remote global state`. So why use `local global state`? Because it's faster
  (no backend requests) and it still makes more sense in many cases. Like for
  unlogged\anonimous users, or for temporary data that doesn't need to be saved
  long-term (like data for a complex search\filter)

### How Redux Works

- Lesson #261 has a good explanation of the mechanism of `Redux`

- `Redux` works similarly to `useReducer`, with a few key differences:

  - Instead of being dispatched to a single reducer function, an `action` is
    dispatched to the global store. In the store, there are many reducers, each
    of which is responsible for a different feature of the application
  - Instead of creating `actions` manually, `Redux Toolkit` has an
    `action creator` function that creates `actions` for us (this is a
    convention, not a must. but it's very recommended)

- It's critical to understand the `Redux cycle` in order to understand `Redux`.
  This cycle starts with an event happening in the application, and it ends with
  a re-render of the UI

- One of the main philosophies of `Redux` is to seperate the
  `state update logic` from the rest of the application

- It's useful to think about `reducers` and `Redux` like a "bank". Someone wants
  to interact with the bank's vault, but they can't do it directly - they need
  to send a proper request to the bank, which will handle it according to it's
  rules and send back a response

- It's also possible to think of a state management library like `Redux` as a
  "local mini-backend". Just like we have rules for properly interacting with a
  remote backend, we have rules for properly interacting with a local global
  data store

### Redux Middleware and Thunks

- `Middleware` is a way of adding extra functionality to `Redux`. It's a
  function that runs after the `dispatch` of an `action` and before it reaches
  the reducer

- In other words, `middleware` is a function that runs in the middle of the
  `Redux cycle`

- The `Middleware` is the preferred place for side effects in `Redux`. It's
  where we can do things like asynch API calls, timers, analytics, logging, etc

- It's technically possible to run side effects inside the components and not in
  the `middleware`, but it's always better to centralize all the side effects in
  one place

- `Thunks` is a popular `middleware` library for `Redux`. It handles asynch
  operations in an efficient way. It's technically possible to write our own
  `middleware` in `Redux` but it's not recommended

- The word "thunk" is a general programming term. It means a function that
  injects a calculation into another function. It comes from the word "think"
  (as in adding another "think" into an existing function)

- An example of a `thunk` in `Redux`:
  - A UI component dispatches an `action` with an order to withdraw the total
    amount of money from a bank account. The `action`'s "type" is known at this
    point, but the "payload" isn't
  - On it's way to the store, the `action` passes through the `thunk`
    middleware. An API call is made to the bank to check the amount of money in
    the account
  - The "payload" of the `action` is updated and the `action` is dispatched to
    the store
  - The `action` reaches the store and the `Redux cycle` continues

### Redux Devtools

- `Redux Devtools` is a browser extension that helps us debug `Redux`
  applications

- ... (complete this part)

## Next.js

- (complete this...)

## React Testing

- Testing without testing libraries is called "manual testing". Testing with
  testing libraries is called "automated testing"

- Knowing testing is important for all developers, but especially for junior and
  mid-level developers, since it's an important skill that is often required by
  employers\clients and gives us an advantage. It also helps us learn to write
  better code

- The importance of automated testing comes from several aspects: First of all,
  it helps us be more confident in our code and in our application. It also
  helps in saving time, debugging, documenting, collaborating, planning (by
  using `TDD`), and more

- A `test suite` is a collection of tests, collected in a single file or folder

- Tests are just regular functions, structured for a specific purpose

- There are several popular testing libraries for React:
  `React Testing Library`, `Jest`, `Vitest` (For Vite, which is almost identical
  to Jest), `Cypress`, `Enzyme`, `Storybook`, and more. Some of these libraries
  complete each other, and some of them are alternatives to each other

- When using `Vite` as a bundler, it's much easier to use `Vitest` instead of
  `Jest`, and the syntax is almost identical

- The most popular way to test React components is by using React Testing
  Library and Jest together. This is the combination that the React team
  recommends. Jest is maintained by Meta

- `Jest` is a general purpose JS testing library, and `React Testing Library` is
  specific for React. First, the React Testing Library renders components to a
  simulated DOM and makes it available. Then, a test runner like `Jest` can find
  tests, run them, make assertions, and report the results

- `Cypress` is a testing library which is different from the others because it
  runs the tests in a real browser, with a graphical interface and a lot of
  functionalities like recording videos, taking screenshots, etc. It's very
  useful for `end-to-end testing` and makes the testing process much more
  visual, interactive, and easy to understand. It's best used for
  `end-to-end testing` but it can also be used for `integration testing` and for
  `unit testing`

- Testing is an especially good opportunity to use `AI`, which can help us a lot
  with coming up with test cases, writing tests, and running tests. Testing is
  very structured and that's a thing that `AI` is good in. We can prompt the
  `AI` what exactly we want to test and get suggestions on how to do it

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

  - `Unit testing` (testing a single unit of code)
  - `Integration testing` (testing how several connected units of code work
    together)
  - `End-to-end testing` (testing the entire application)
  - `Simulated DOM`
  - `Assertions` (checking if something is true or false)
  - `Mocking` (creating fake data for testing)
  - `Test driven development (TDD)`: Writing the tests before writing the code
    itself
  - `Test coverage`: How much of the code is covered by the tests
  - `Async testing`
  - `Snapshot testing`
  - `Arrange, act, assert` (or "AAA" - A common testing pattern)

- Some of the most important things that we want to test in React are:

  - `Rendering`
  - `State changes`
  - `User interactions`: Common user actions, core\high value actions, edge
    cases

- `End to end testing` in React: There are 2 main ways of doing this - using
  `Puppeteer` and using `Cypress`

- Testing with `Puppeteer` can be done using the `Chromium` browser, which can
  also be used for other things like web scraping

- End to end tests are just regular tests, which contain a full user flow and
  are run on a real browser and not on a virtual browser

- `Cypress` installs with a few "getting started" tests out of the box

- There's a Chrome extension named `Testing Playground` which is useful for
  testing, especially end to end testing

- It's important to remember that errors can happen because of errors in our
  testing code, not because of the original code. We need to pay attention to
  this because unfortunately, we don't test our test code

- More things that should be tested: Things that break easily, basic React
  components, user interactions, conditional rendering, utilities and hooks

- We should try to aspire to do as many large tests rather than small ones, to
  make sure we cover actual use cases

- There's no distinct separation between the 3 types of tests. It's largely a
  matter of subjective definition

- Tests aim to check functionality, not implementation. For this purpose, they
  try to be as implementation-agnostic as possible (for instance - react and vue
  should be tested in the same way, and give the same results)

- Mock functions allow focusing on specific functions, and testing them in an
  in-depth way. This is useful if we have complex, critical functions that
  require special treatment

## React Styling

### General

- Since React is a library and not a framework, it's not opinionated when it
  comes to styling. Any styling method can be used, according to the project
  needs

- Main methods of styling React components:

  - `Inline styles`: Styles that are written directly in the JSX code. This is
    the least recommended way of styling

  - `Global CSS\SASS file`: A possible way of styling React components, but
    global styles can be hard to manage and can cause conflicts

  - `CSS Modules`: One external style file per component

  - `CSS-in-JS`: CSS in the JavaScript. This is a very popular way of styling
    React components. Some of the libraries that help do this are
    `Styled Components` and `Emotion`

  - `Utility-first CSS`: Styling React components usin pre-defined utility
    classes. The most popular library for this is `Tailwind CSS`

  - `UI libraries`: Libraries like `Material UI`, `Chakra UI`, `React Bootstrap`
    and `Mantine` that provide pre-built components and styles. This is
    especially good for small projects since it saves a ton of time on building
    UI

### Tailwind CSS

- `Tailwind CSS` is a "utility-first CSS framework". It's a CSS framework that
  doesn't have any pre-built components (like Material UI has), but instead
  provides a lot of `utility classes` that we can use to build our own
  components

- `Tailwind CSS` is a very popular CSS framework, and it's very easy to use. It
  has a lot of built-in classes that we can use to style our components, and it
  also has a lot of built-in plugins that we can use to extend it's
  functionality

- `Tailwind CSS` only adds a "thin layer" of abstraction over vanilla CSS, so it
  still feels like writing custom CSS, only in a different way

- "Core concepts": There are several core concepts that we need to know in
  `Tailwind CSS`, all are covered in the docs

- The best way to understand `Tailwind CSS` and how to use it in any specific
  case is to go over the docs, which are very comprehensive and good

- The `Inline Fold` VSCode extension is useful when working with Tailwind CSS

- It's also recommended to install the `Tailwind CSS IntelliSense` VSCode
  extension + the `prettier-plugin-tailwindcss` plugin (using NPM) in order to
  get better `Tailwind CSS` support in Preitter

- When setting up `Tailwind CSS` in a project, it's important to follow the docs
  and pay attention to the recommended settings and packages

- Inside `tailwind.config.js` we can set up the "theme" of the project. We can
  set up the font family, font size, font weight, color pallete, text sizes,
  breakpoints and so on of the entire project for easier access. We can also add
  useful plugins to the config file

- It's possible to use `Tailwind CSS` with `JSX` (using the `className`
  attribute) and also with `HTML` (using the `class` attribute)

- Working with color: It's pretty simple, just add color utility classes. For
  example: `text-red-500`, `bg-green-500`, etc.

- Styling text: Also pretty simple, just add text utility classes. For example:
  `text-2xl`, `text-center`, etc.

- Using brackets in utility classes can add dynamic values. For example:
  `text-[#ffffff]`, `text-[300px]`, etc.

- Margin\padding: `Tailwind CSS` has a lot of margin utility classes. For
  example: `m-4`, `mt-4`, `mx-4` `px-4` `py-3`, etc. More info in the docs

- Borders: Adding borders is done with 2 attributes: One for width and one for
  color. For example: `border-2 border-red-500`

- The `space` class: A "trick" that easily adds spaceing between child elements
  of the element on which it's used

- Responsive design: In `Tailwind CSS`, screen sizes start with mobile and go up
  to desktop. This means that default styles are for mobile and above, and
  custom styles are for the desired size and above. For example:
  `md:text-center` will apply the `text-center` class only on medium screens and
  above. Breakpoints can be configured in `tailwind.config.js`

- `Flexbox`: The `flexbox` classes are very similar to the regular `Flexbox`
  classes in CSS. For example: `flex flex-col`, `flex flex-row`, `flex-1`,
  `justify-center`, `items-center`, etc.

- `Grid`: The `grid` classes are very similar to the regular `Grid` classes in
  CSS. For example: `grid grid-cols-2`, `grid-cols-3`, `grid-cols-4`,
  `grid-cols-5`, etc.

- It's always recommended to have `css-tricks.com` open when working with CSS,
  especially in the context of `flexbox` and `grid`

- Element states and transitions: These are similar to the regular CSS classes
  for element states and transitions. For example: `hover:bg-red-500`,
  `transition duration-500 ease-in-out`, etc.

- `Rings`: `Rings` are a concept that `Tailwind CSS` made up. They are basically
  a way of adding a border to an element, but with more options like drop shadow

- Reusing styles with `@apply`: We can create our own utility classes by using
  `@apply` in the `tailwind.config.js` file. For example:
  `@apply text-center text-2xl text-red-500`. This is like creating an "old
  school" CSS named class (and the syntax is also similar). These classes are
  created in a `@layer`, which is yet another `Tailwind CSS` concept. Using
  `@apply` kind of defeats the purpose of `Tailwind CSS`, so it should only be
  used in specific cases. One such case is when we want to create a class with a
  basic style that can be slightly modified in different places (regular
  `Tailwind CSS` utility classes will get precedence over `@apply` utility
  classes in the same element)

- Reusing styles with React components: This is the generally preferred way of
  reusing anything in React, including styles. Fore example: A `Button` elment
  that accepts a state variable + the children as props

- Positioning\z-index: There are utility classes for that as well

- Accessing `Tailwind CSS` classes from regular CSS: This can be done using the
  theme() function. For example: `theme('colors.red.500')`

- Customizing `Tailwind CSS`: There are several ways to customize
  `Tailwind CSS`, one of which is customizing the `default theme`, using the
  `tailwind.config.js` file. For example: Adding custom fonts, adding custom
  colors, adding custom utility classes, etc. The entire `default theme` can be
  seen in the docs. Anything in this theme can be overridden. If we don't want
  to override things but just to extend the theme, we can use the `extend`
  object inside the `tailwind.config.js` file. This can be very useful when
  working with a `Figma` design which has custom colors, fonts and elements

## React Project Planning and Management

### General

- There's no one way to plan and manage a React project, and the course of a
  project never goes perfectly according to a plan. But this is a general basic
  guideline that Jonas recommends for starting a new React project:

  - Step 1: Gather the application requirements and features from the client (in
    other words - the "business logic")

  - Step 2: Devide the application into pages and design the UI

    - Plan the desired UI. Overall UI and the page-level UI
    - Break the desired UI into React components
    - Design a static version in Figma\AdobeXD. Start with a wireframe and
      continue to the final design, including user flow simulations

  - Step 3: Devide the application into feature categories

    - Plan the application's state management and data flow

  - Step 4: Decide on which React-compatible libraries to use (technology\stack
    decisions)

## React Performance Optimization (optional)

### General

- Since React 19, the "React Compiler" is built-in to React, and it makes
  "memoization" and "lazy loading" automatic. Still, it's good to understand
  these concepts

- There are 3 main ways of optimizing React applications:
  - Preventing unnecessary re-renders
  - Improving app speed\responsiveness
  - Reducing bundle size

### The "Profiler" React Developer Tool

- We usually use the "Components" tab of the React dev tools, but the "Profiler"
  tab is also important. It shows us the renders and re-renders, including how
  long everything took

- It's important to review the Profiler's settings and to set the "record why
  each component rendered" option to "on"

- To start recoeding, click the "record" button in the Profiler tab and start
  doing stuff

### Memoization

- `Memoization` is an optimization method. If a pure function is called, it's
  result is saved. Then, if it's called again with the same parameters, it the
  result will be taken from memory. This makes sense since pure functions always
  work the same. The same is true for React components, which are also pure
  functions (they always return the same UI for the same props)

- If `Memoization` is done manually (in React 18 and below), it can be done at
  the final stages of the app's development, when everything is working and we
  only need to make it faster

- `Memoization` only affects props. If a component has a state that changes, it
  will always re-render

- A `wasted render` is a render that takes place when a prop is changed, but it
  doesn't change anything in the UI

- There's no need to momoize everything. Only the components that are noticeably
  slow to render and\or that re-render often should be memoized. Otherwise, we
  will add unnessecary complexity to the code or even slow it down

- To use the `memo` function, we need to wrap the component in a `memo` function
  and save it as a variable

- To use the `useMemo` hook, we need to pass a function that returns the value
  that we want to memoize, and an array of dependencies

- Why do we also need `useMemo` if we have `memo`? Because if a component
  recieves an object as a prop, `memo` will compare the object's reference in
  memory, which is always different in JS

- `useCallback` is simply a specific use case of `useMemo`. It's used to memoize
  "regular" functions (which aren't components)

- `useMemo` and `useCallback` both have a dependency array, like `useEffect`.

- (I can continue this chapter if I need this information in the future. I
  stopped after lesson #248)

## Codux Summary (optional)

- `Codux` is a visual editor for `React`

- It's still new and expiramental, but maybe in the near furture it will become
  more mainstream

- I already have thr `Codux` editor installed (it's a seperate program, not a
  web app). It only works with specific stacks (Vite or CRA\React\TS\certain CSS
  libraries\some other things), so the main challange will be to find clients
  that will be willing to work with it

- I should leave `Codux` aside for now, and advance with it if I find a client
  that wants to work with it or when it gets better (it's currently in beta and
  still a bit "shakey")

- `Codux` features component isolation, similar to `Storybook`. Components are
  isolated inside `boards`

- The fact that there's `AI` integrated into `VSCode` makes using a visual
  editor like `Codux` a bit less advantageous, but it might still have it's
  advantages in certain cases and for certain clients\projects

## The Wild Oasis Project (optional)

### SupaBase - The Project's Database

- In `relational databases`, the `foreign key relation` needs to be placed in
  the table that is "more limited". For example: If a cabin can have as many
  bookings as we want, but every booking can involve only one cabbin, then the
  bookings table is the one that should contain the foreign key

- It's important to notice "row level security" rules in `SupaBase`. If there is
  no permission to access a certain row in a certain way, nothing that we will
  do in the application will work

### React Query

- `React Query` is the most popular querying tool for React today, even more
  than the "official" react querying tool (Redux)

- One of the most important differences between `local state` and `remote state`
  is that `remote state` is shared by many different users and admins - so
  different users\instances of the app can easily get out of sync with each
  other. `React Query` helps us with that

### React Hook Form

- A library that really helps us with forms in React. It saves us from writing a
  lot of boilerplate code like variables for each input, onChange handlers, etc.
  It also has a lot of built-in validation tools, and it's generally a good
  React library to know
