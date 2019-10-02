<template>
  <div id="login">
    <h2>ログイン</h2>
    <button @click="twitterLogin">Twitterでログイン</button>
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
  text-align: center;

  button {
    display: inline-block;
    background-color: #00acee; /*背景色*/
    color: #fff; /*文字色*/
    font-size: 1.2em; /*文字サイズ*/
    line-height: 1;
    text-decoration: none;
    letter-spacing: 0.05em; /*字間*/
    padding: 0.2em 1em; /*ボタン内の余白*/
    border-radius: 3px; /*角の丸み*/
    cursor: pointer;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2); /*影*/
    -webkit-tap-highlight-color: transparent;
    transition: 0.3s ease-out; /*変化を緩やかに*/
  }

  button:hover {
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2); /*浮き上がるように*/
  }
}
</style>
