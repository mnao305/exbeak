<template>
  <div>
    <textarea v-model="tweetText" id="tweetText" name="tweetText" cols="30" rows="10" />
    <div id="subArea">
      {{ message }}
      <button class="tweetBtn" @click="tweet">Tweet</button>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import axios from 'axios'
export default {
  data() {
    return {
      tweetText: '',
      message: '',
      timerID: null,
    }
  },
  methods: {
    async tweet() {
      try {
        clearTimeout(this.timerID)
        this.message = 'Tweet中...'
        const token = await firebase.auth().currentUser.getIdToken()
        await axios.post(
          'https://asia-northeast1-exbeak.cloudfunctions.net/tweet',
          { tweet: this.tweetText },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        this.tweetText = ''
        this.message = 'Tweet完了'
        this.timerID = setTimeout(() => {
          this.message = ''
        }, 2000)
      } catch (error) {
        console.error(error)
        this.message = 'Tweet失敗'
        this.timerID = setTimeout(() => {
          this.message = ''
        }, 2000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  resize: vertical;
}
.tweetBtn {
  display: block;
  margin: 0 0 0 auto;
}
</style>
