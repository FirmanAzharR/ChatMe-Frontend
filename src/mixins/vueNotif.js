export default {
  methods: {
    makeToast(bodyMsg, msg, variant) {
      this.$bvToast.toast(bodyMsg, {
        title: msg,
        variant: variant,
        solid: true
      })
    },
    vueChatNotif(msg) {
      this.$toast.info(`${msg}`, {
        position: 'top-right',
        timeout: false,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 0.4,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
    },
    vueToastSuccess(msg) {
      this.$toast.success(`${msg}`, {
        position: 'top-right',
        timeout: 1000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: '',
        rtl: false
      })
    },
    vueToastFailed(msg) {
      this.$toast.error(`${msg}`, {
        position: 'top-right',
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: '',
        rtl: false
      })
    }
  }
}
