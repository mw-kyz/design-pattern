import TodoDom from "./TodoDom"
import TodoEvent from "./TodoEvent"

export interface ITodo {
  id: number,
  content: string,
  completed: boolean
}

export enum EVENT_TYPE {
  ADD = 'add',
  REMOVE = 'remove',
  TOGGLE = 'toggle'
}

class TodoList {
  private static instance: TodoList
  private oTodoList: HTMLElement
  private initData: ITodo[]
  private todoEvent: TodoEvent
  private todoDom: TodoDom
  private addHandles: any[] = []
  private removeHandles: any[] = []
  private toggleHandles: any[] = []

  constructor (oTodoList: HTMLElement, initData: ITodo[]) {
    this.oTodoList = oTodoList
    this.initData = initData
    this.initTodo()
  }

  public static create (oTodoList: HTMLElement, initData: ITodo[]) {
    if (!TodoList.instance) {
      TodoList.instance = new TodoList(oTodoList, initData)
    }

    return TodoList.instance
  }

  private initTodo () {
    this.todoEvent = TodoEvent.create()
    this.todoDom = TodoDom.create(this.oTodoList)

    for (let k in EVENT_TYPE) {
      this.initHandles(EVENT_TYPE[k])
    }

    if (this.initData.length > 0) {
      this.initData.forEach(todo => {
        this.notify<ITodo>(EVENT_TYPE.ADD, todo)
      })
    }
  }

  private initHandles (type: EVENT_TYPE) {
    switch (type) {
      case EVENT_TYPE.ADD:
        this.addHandles.push(this.todoEvent.addTodo.bind(this.todoEvent))
        this.addHandles.push(this.todoDom.addItem.bind(this.todoDom))
        break
      case EVENT_TYPE.REMOVE:
        this.removeHandles.push(this.todoEvent.removeTodo.bind(this.todoEvent))
        this.removeHandles.push(this.todoDom.removeItem.bind(this.todoDom))
        break
      case EVENT_TYPE.TOGGLE:
        this.toggleHandles.push(this.todoEvent.toggleTodo.bind(this.todoEvent))
        this.toggleHandles.push(this.todoDom.toggleItem.bind(this.todoDom))
        break
      default:
        break
    }
  }

  public notify<T> (type: string, param: T) {
    let i: number = 0
    let handles: any[] = []
    let res: any

    switch (type) {
      case EVENT_TYPE.ADD:
        handles = this.addHandles
        break
      case EVENT_TYPE.REMOVE:
        handles = this.removeHandles
        break
      case EVENT_TYPE.TOGGLE:
        handles = this.toggleHandles
        break
      default:
        break
    }

    res = handles[i](param)

    while (i < handles.length - 1) {
      i++
      res = res.then(param => {
        return handles[i](param)
      })
    }
  }
}

export default TodoList