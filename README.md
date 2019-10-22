# eventhoven

> Compose events effortlessly 🎵

## What is this?
It's a simple event manager library, less than 1KB in size gzipped.

It provides a powerful set of tools for creating and composing event managers.\
In other words, it manages event managers!

A main list of features includes (but not limited to):
- Full tree-shaking
- Functional-style API
- Versatile plugin system (using [meta-events](#meta-events))
- Fully type-safe - each event remembers its type signature
- **SOLID**
  - **S**RP - every function does only one thing
  - **O**CP - HOFs allow to change certain behaviours without the need to rewrite code
  - **L**SP - all funcions and types are easily substitutable using dependency injection
    as long as they adhere to the same API
  - **I**SP - all data types are the least specific versions of them
  - **D**IP - API depends only on abstractions
- **DRY** and **KISS**
