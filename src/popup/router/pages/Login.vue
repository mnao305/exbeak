<template>
  <div>
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
        const dbData = await db
          .collection('users')
          .doc(data.user.uid)
          .get()

        await db
          .collection('users')
          .doc(dbData.id)
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
