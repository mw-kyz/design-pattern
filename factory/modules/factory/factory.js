/**
 * 有一些公共的方法、属性、静态工具
 * Modal 父类
 * 
 * 对每种状态内部属性加工，或者每种状态的功能扩展
 * Success Warning Error Modal 不同的类
 * 
 * 有个工厂通过传入的状态来给我自动实例化相应的类
 * 
 * Modal Factory
 */
import { ModalTypes, ModalClassName } from './typing.js'

class Modal {
  constructor (status, title) {
    this.status = status
    this.title = title
  }

  get className () {
    let classStr = 'modal '
    switch (this.status) {
      case ModalTypes.SUCCESS:
        classStr += ModalClassName.SUCCESS
        break
      case ModalTypes.WARNING:
        classStr += ModalClassName.WARNING
        break
      case ModalTypes.ERROR:
        classStr += ModalClassName.ERROR
        break
      default:
        break
    }

    return classStr
  }

  static checkStatusIsExist (types, status) {
    for (let k in types) {
      if (types[k] === status) {
        return true
      }
    }

    return false
  }

  static outputInfo (info) {
    console.log(info)
  }
}

class SuccessModal extends Modal {
  constructor (title) {
    super(ModalTypes.SUCCESS, title)
  }

  get titleText () {
    return '成功：' + this.title
  }

  go (url) {
    setTimeout(() => {
      window.location.href = url
    }, 3000)
  }
}

class WarningModal extends Modal {
  constructor (title) {
    super(ModalTypes.WARNING, title)
  }

  get titleText () {
    return '告警：' + this.title
  }

  outputInfo (info) {
    Modal.outputInfo(info)
  }
}

class ErrorModal extends Modal {
  constructor (title) {
    super(ModalTypes.ERROR, title)
  }

  get titleText () {
    return '失败：' + this.title
  }

  outputInfo (info) {
    Modal.outputInfo(info)
  }
}

class ModalFactory {
  constructor (dom) {
    this.dom = dom
  }

  create (title, status) {
    const statusIsExist = Modal.checkStatusIsExist(ModalTypes, status)

    if (!statusIsExist) {
      throw new Error('Modal type is incorrect')
      return
    }

    const dom = this.dom
    let modal = null

    switch (status) {
      case ModalTypes.SUCCESS:
        modal = new SuccessModal(title)
        break
      case ModalTypes.WARNING:
        modal = new WarningModal(title)
        break
      case ModalTypes.ERROR:
        modal = new ErrorModal(title)
        break
      default:
        break
    }

    dom.getElementsByTagName('header')[0].innerText = modal.titleText
    dom.className = modal.className

    return {
      outputInfo: modal.outputInfo,
      go: modal.go
    }
  }
}

export default ModalFactory