# React - General Notes

## React Basics

- A concise summary of React hooks:
  - (complete this later, from the fireship hooks video...)

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
