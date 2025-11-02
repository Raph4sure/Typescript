interface TodoItems{
    id: number;
    title: Title;
    status: Progress;
    completedOn?: Date;

}

enum Progress{
    InProgress= 'in-progress',
    Done= 'done',
    Todo= 'to-do'
}

type Title = string

const todoItems: TodoItems[] = [
    { id: 1, title: "Learn HTML", status: Progress.Done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: Progress.InProgress },
    { id: 3, title: "Write the best app in the world", status: Progress.Todo },
]

function addTodoItem(todo: string): TodoItems {
    const id = getNextId(todoItems)

    const newTodo = {
        id,
        title: todo,
        status: Progress.Todo,
    }

    todoItems.push(newTodo)

    return newTodo
}

function getNextId<T extends { id: number }>(items: T[]) {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))
