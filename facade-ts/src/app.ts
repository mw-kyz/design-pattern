import TodoList from './components/TodoList';
import { ITodoData } from './typings';

((doc) => {
  const oApp: HTMLElement = doc.querySelector('#app') as HTMLElement

  const todoData: ITodoData[] = []

  const init = (): void => {
    const todolist: TodoList = new TodoList(oApp, todoData)
    todolist.init()
  }

  init()
})(document)