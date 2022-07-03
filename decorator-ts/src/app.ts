import TodoList, { ITodo } from './TodoList'

;((doc) => {
  
  const oInput: HTMLInputElement = doc.querySelector('input')
  const oAddBtn: HTMLElement = doc.querySelector('.add-btn')
  const oTodoList: HTMLElement = doc.querySelector('.todo-list')

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

    todoList.addItem({
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
          todoList.toggleCompleted(id)
          break
        case 'button':
          todoList.removeItem(id)
          break
        default:
          break
      }
    }
  }

  init()

})(document)