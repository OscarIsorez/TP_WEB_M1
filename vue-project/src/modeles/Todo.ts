class Todo {
  /* 
    DataClass for a Todo item
    Attributes:
      - title: string - The title of the todo item
      - state: string - The current state of the todo item (e.g., "pending", "done")
      - date: Date - The date associated with the todo item
  */
  title: string
  state: string
  date: Date

  constructor(title: string, state: string, date: Date) {
    this.title = title
    this.state = state
    this.date = date
  }
}
