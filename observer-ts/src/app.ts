import TodoList, { ITodo, EVENT_TYPE } from './TodoList'

;((doc) => {

  const oTodoList: HTMLElement = doc.querySelector('.todo-list') as HTMLElement
  const oAddBtn: HTMLElement = doc.querySelector('.add-btn') as HTMLElement
  const oInput: HTMLInputElement = doc.querySelector('input') as HTMLInputElement

  const initData: ITodo[] =  [{
    id: 1,
    content: '123',
    completed: false
  }]

  const todoList: TodoList = TodoList.create(oTodoList, initData)

  const init = (): void => {
    bindEvent()
  }

  function bindEvent () {
    oAddBtn.addEventListener('click', handleAddBtnClick, false)
    oTodoList.addEventListener('click', handleListClick, false)
  }

  function handleAddBtnClick () {
    const val: string = oInput.value.trim()

    if (!val.length) {
      return
    }

    todoList.notify<ITodo>(EVENT_TYPE.ADD, {
      id: Date.now(),
      content: val,
      completed: false
    })

    oInput.value = ''
  }

  function handleListClick (e: MouseEvent) {
    const tar = e.target as HTMLElement
    const tagName = tar.tagName.toLowerCase()

    if (tagName === 'input' || tagName=== 'button') {
      const id: number = Number(tar.dataset.id)

      switch (tagName) {
        case 'input':
          todoList.notify<number>(EVENT_TYPE.TOGGLE, id)
          break
        case 'button':
          todoList.notify<number>(EVENT_TYPE.REMOVE, id)
          break
        default:
          break
      }
    }
  }

  init()

})(document)