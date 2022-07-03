import Component from './Component'
import List from './List'

export interface IInputOptions {
  wrapEl: HTMLElement,
  placeholder: string,
  buttonText: string
}

class Input extends Component {

  private options: IInputOptions

  constructor (options: IInputOptions) {
    super()
    this.options = options
  }

  public render () {
    const { placeholder, buttonText } = this.options
    this.options.wrapEl.innerHTML += Component.inputView(placeholder, buttonText)
  }

  public bindEvent () {
    const oAddBtn: HTMLElement = document.querySelector('.add-btn') as HTMLElement
    const oInput: HTMLElement = document.querySelector('.todo-input') as HTMLElement
    oAddBtn.addEventListener('click', this.handleBtnClick.bind(this, oInput), false)
  }

  private handleBtnClick (inputDom) {
    const val: string = inputDom.value.trim()

    if (val.length) {
      List.addItem(val)
      inputDom.value = ''
    }
  }
}

export default Input