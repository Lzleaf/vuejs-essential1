<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        msg: '', // 消息
        msgType: '', // 消息类型
        msgShow: false // 是否显示消息，默认不显示
      }
    },
    beforeRouteEnter(to, from, next) {
      const fromName = from.name
      const logout = to.params.logout

      next(vm => {
        if (vm.$store.state.auth) {
          switch (fromName) {
            case 'Register':
              vm.$message.show('注册成功')
              break
            case 'Login':
              vm.$message.show('登录成功')
              break
          }
        } else if (logout) {
          vm.$message.show('操作成功')
        }
      })
    },
    computed: {
      auth() {
        return this.$store.state.auth
      }
    },

    watch: {
      auth(value) {
        if (!value) {
          this.$message.show('操作成功')
        }
      }
    },
  }
</script>

<style scoped>

</style>
