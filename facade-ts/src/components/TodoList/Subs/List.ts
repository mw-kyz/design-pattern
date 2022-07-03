import { ITodoData } from "../../../typings";
import Component from "./Component";

export interface IListOptions {
  wrapEl: HTMLElement,
  todoData: ITodoData[]
}

class List extends Component {

  private wrapEl: HTMLElement
  private static todoData: ITodoData[]

  constructor (options: IListOptions) {
    super()
    this.wrapEl = options.wrapEl
    List.todoData = options.todoData
  }

  public render () {
    this.wrapEl.innerHTML += Component.listView(List.todoData)
  }

  public bindEvent () {
    const oTodoList: HTMLElement = document.querySelector('.todo-list') as HTMLElement
    oTodoList.addEventListener('click', this.handleListClick.bind(this), false)
  }

  private handleListClick (e: Event) {
    const tar = e.target as HTMLElement
    const tagName = tar.tagName.toLowerCase()
    const oTodoItems: HTMLCollection = document.getElementsByClassName('todo-item')

    if (tagName === 'input' || tagName === 'button') {
      const id = Number(tar.dataset.id)

      switch (tagName) {
        case 'input':
          this._handleCheckBoxClick(id, oTodoItems)
          break
        case 'button':
          this._handleButtonClick(id, oTodoItems)
          break
        default:
          break
      }
    }
  }

  private _handleCheckBoxClick (id: number, oTodoItems: HTMLCollection) {

    List.todoData = List.todoData.map((todo: ITodoData, index: number) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
        const oSpan = oTodoItems[index].querySelector('span') as HTMLSpanElement
        oSpan.style.textDecoration = todo.completed ? 'line-through' : ''
      }

      return todo
    })
  }

  private _handleButtonClick (id: number, oTodoItems: HTMLCollection) {
    List.todoData = List.todoData.filter((todo: ITodoData, index: number) => {
      if (todo.id !== id) {
        return true
      } else {
        // 从dom节点移除
        oTodoItems[index].remove()
        return false
      }
    })

    if (List.todoData.length === 0) {
      const oTodoList: HTMLElement = document.querySelector('.todo-list') as HTMLElement
      oTodoList.innerHTML = '当前没有数据'
    }
  }

  public static addItem (val: string) {
    const oTodoList: HTMLElement = document.querySelector('.todo-list') as HTMLElement
    const _item: ITodoData = {
      id: Date.now(),
      content: val,
      completed: false
    }

    if (List.todoData.length === 0) {
      oTodoList.innerHTML = ''
    }

    List.todoData.push(_item)

    oTodoList.innerHTML += Component.todoView(_item)
  }
}

export default List