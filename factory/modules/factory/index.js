import ModalFactory from './factory.js'
import { ModalTypes } from './typing.js'

;(() => {
  const oModal = document.getElementsByClassName('modal')[0]
  const oBtnGroup = document.getElementsByClassName('btn-group')[0]
  const modalFactory = new ModalFactory(oModal)

  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    oBtnGroup.addEventListener('click', handleBtnClick, false)
  }

  function handleBtnClick (e) {
    const target = e.target
    const tagName = target.tagName.toLowerCase()

    if (tagName === 'button') {
      const status = target.dataset.status

      const modal = modalFactory.create('这是一个工厂模式的应用场景', status)
      // changeStatus(status)

      switch (status) {
        case ModalTypes.SUCCESS:
          modal.go('https:www.baidu.com')
          break
        case ModalTypes.WARNING:
          modal.outputInfo('这是一个告警提示')
          break
        case ModalTypes.ERROR:
          modal.outputInfo('这是一个失败提示')
          break
        default:
          break
      }
    }

  }

  // function changeStatus (status) {
  //   switch (status) {
  //     case 'S':
  //       oModal.className = 'modal success'
  //       break
  //     case 'W':
  //       oModal.className = 'modal warning'
  //       break
  //     case 'E':
  //       oModal.className = 'modal error'
  //       break
  //     default:
  //       break
  //   }
  // }

  init()
})()