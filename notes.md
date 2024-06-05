# The React Framework and Related Subjects - General Notes

## React Basics

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
- `useEffect` - for hooking onto component lifecycle events. It's made of 3
  parts: The effect, a cleanup function (optional) and the dependency array.
  Components have 3 lifecycle events: `Mount`, `update`, `unmount`. We can
  use`useEffect` to hook onto any of these events:
  - `mount` -> an empty dependency array
  - `update` -> dependency\ies in the dependency array
  - `unmount` -> a cleanup function in the dependency array
- `useContext` - an option for context management ("global state")

Additional `Hooks`:

- IMPORTANT NOTE: The `useMemo`, `useCallback` and `memo` hooks were made
  obsolete by the `React compiler` in React version 19

- `useRef` - for creating mutible values, that we can later decide when to
  trigger a UI update (by using the useEffect hook). Also, it can be used for
  DOM refs like triggering focus or a click
- `useReducer` - similar to state, but for more complex state management like
  Redux which uses reducers
- `useMemo` - for memoization of values, which is a way of caching values so
  that we don't need to recompute them every time. It's recommended to use it
  only when optimizing performance (made obsolete by the `React compiler`)
- `useCallback` - for memoization of functions. It's recommended to use it only
  when optimizing performance (made obsolete by the `React compiler`)
- `useImperativeHandle` - Rarely used. For exposing imperative API to parent
  components (exposed by useRef)
- `useLayoutEffect` - Rarely used. Similar to useEffect, but runs synchronously
  after all DOM mutations, and just before the browser paint
- `useDebugValue` - for debugging custom hooks. It will define a label for the
  custom hook in the React DevTools

Important notes about `Hooks`:

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

### Other Important General Notes

- Since React 18, if React is in strict mode and we call a `useEffect` hook
  during development, React will run the effect once for every function within
  the hook. This might cause repeated console.logs and other strange behaviours
  (that can be ignored). In production, the effect will run only once

- It's always important to add `error handling` wherever errors might occur

- The `React DevTools` are a very important tool for debugging React
  applications. In addition, there are devtools for `React Query`, `Redux`, and
  other popular React libraries

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

## Tailwind CSS

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

## Codux Summary

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

## The Wild Oasis Project

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
