import Inputmask from 'inputmask'

export default {
    install: (Vue, options) => {
        Vue.directive('mask', {
            bind (el, binding) {
                Inputmask(binding.value).mask(el)
            }
        })
    }
}
