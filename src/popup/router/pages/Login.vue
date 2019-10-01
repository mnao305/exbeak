<template>
  <div>
    <h2>ログイン</h2>
    <button @click="twitterLogin">Twitterでログインする</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    twitterLogin() {
      this.$router.push('/tweet')
    },
  },
}
</script>
