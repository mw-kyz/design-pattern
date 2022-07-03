import { ITodoData } from "../../typings"
import Input, { IInputOptions } from './Subs/Input'
import List, { IListOptions } from "./Subs/List"

class TodoList {

  private el: HTMLElement
  private todoData: ITodoData[]
  private input: Input
  private list: List
  private todoWrap: HTMLElement

  constructor (el: HTMLElement, todoData: ITodoData[]) {
    this.el = el
    this.todoData = todoData
    this.todoWrap = document.createElement('div')

    console.log(this.el, this.todoData)
  }

  public init () {
    this.createComponentns()
    this.render()
    this.bindEvent()
  }

  private createComponentns () {
    this.input = new Input(<IInputOptions>{
      wrapEl: this.todoWrap,
      placeholder: '请输入',
      buttonText: '增加'
    })
    this.list = new List(<IListOptions>{
      todoData: this.todoData,
      wrapEl: this.todoWrap
    })
  }

  private render () {
    this.input.render()
    this.list.render()
    this.el.appendChild(this.todoWrap)
  }

  private bindEvent () {
    this.input.bindEvent()
    this.list.bindEvent()
  }
}

export default TodoList