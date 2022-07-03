import { todoView } from './template'
import { addTodo, removeTodo, changeCompleted } from './todoEvent'

export interface ITodo {
  id: number,
  content: string,
  completed: boolean
}

class TodoList {
  private static instance: TodoList
  private data: ITodo[]
  private oTodoList: HTMLElement

  constructor (oTodoList: HTMLElement, data: ITodo[]) {
    this.oTodoList = oTodoList
    this.data = data

    this.initData()
  }

  private initData() {
    if (this.data.length > 0) {
      this.data.forEach(todo => {
        this.addItem(todo)
      })
    }
  }

  public static create (oTodoList: HTMLElement, data: ITodo[]) {
    if (!TodoList.instance) {
      TodoList.instance = new TodoList(oTodoList, data)
    }

    return TodoList.instance
  }

  @addTodo
  public addItem (todo: ITodo): void {
      const oItem: HTMLElement = document.createElement('div')
      oItem.className = 'todo-item'
      oItem.innerHTML = todoView(todo)

      this.oTodoList.appendChild(oItem)
  }

  @removeTodo
  public removeItem (id: number): void {
    const oItems: HTMLCollection = document.getElementsByClassName('todo-item')

    Array.from(oItems).forEach(oItem => {
      const _id = parseInt(oItem.querySelector('button').dataset.id)
  
      if (_id === id) {
        oItem.remove()
      }
    })
  }

  @changeCompleted
  public toggleCompleted (id: number, completed?: boolean): void {
    const oItems: HTMLCollection = document.getElementsByClassName('todo-item')
    Array.from(oItems).forEach(oItem => {
      const _id = parseInt(oItem.querySelector('input').dataset.id)

      if (_id === id) {
        const oContent: HTMLElement = oItem.querySelector('span')
        oContent.style.textDecoration = completed ? 'line-through' : 'none'
      }
    })
  }
}

export default TodoList