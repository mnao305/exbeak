<template>
  <div id="login">
    <h2>ログイン</h2>
    <button @click="twitterLogin">Twitterでログインする</button>
  </div>
</template>

<script>
import auth from '@/plugins/auth'
import { db } from '@/plugins/firestore'

export default {
  data() {
    return {}
  },
  methods: {
    async twitterLogin() {
      try {
        const data = await auth.twitterLogin()

        await db
          .collection('users')
          .doc(data.user.uid)
          .set(
            {
              accessToken: data.credential.accessToken,
              secret: data.credential.secret,
            },
            { merge: true }
          )
        this.$router.push('/tweet')
      } catch (error) {
        this.errorMessage = 'ログインに失敗しました。'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#login {
  height: 100px;
}
</style>
