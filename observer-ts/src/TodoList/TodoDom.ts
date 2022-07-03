import { ITodo } from './index'

class TodoDom {
  private static instance: TodoDom
  private oTodoList: HTMLElement
  
  constructor (oTodoList: HTMLElement) {
    this.oTodoList = oTodoList
  }

  public static create(oTodoList: HTMLElement) {
    if (!TodoDom.instance) {
      TodoDom.instance = new TodoDom(oTodoList)
    }

    return TodoDom.instance
  }

  public addItem (todo: ITodo): Promise<void> {
    return new Promise((resolve, reject) => {
      const oItem: HTMLElement = document.createElement('div')
      
      oItem.className = 'todo-item'
      oItem.innerHTML = this.todoView(todo)
      this.oTodoList.appendChild(oItem)

      resolve()
    })
  }

  public removeItem (id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const oItems: HTMLCollection = document.getElementsByClassName('todo-item')

      Array.from(oItems).forEach(oItem => {
        const _id = parseInt(oItem.querySelector('button')?.dataset.id || '')

        if (_id === id) {
          oItem.remove()
          resolve()
        }
      })
    })
  }

  public toggleItem (id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const oItems: HTMLCollection = document.getElementsByClassName('todo-item')

      Array.from(oItems).forEach(oItem => {
        const oCheckbox: HTMLInputElement = oItem.querySelector('input') as HTMLInputElement
        const _id = parseInt(oCheckbox?.dataset.id || '')

        if (_id === id) {
          const oContent: HTMLElement = oItem.querySelector('span') as HTMLElement
          oContent.style.textDecoration = oCheckbox.checked ? 'line-through' : 'none'
          resolve()
        }
      })
    })
  }

  public todoView ({ id, content, completed }: ITodo): string {
    return `
      <input type="checkbox" data-id="${ id }" ${ completed ? 'checked' : '' } />
      <span style="text-decoration: ${ completed ? 'line-through' : 'none' }">${ content }</span>
      <button data-id="${ id }">删除</button>
    `
  }
}

export default TodoDom