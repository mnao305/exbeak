<template>
  <div>
    <textarea v-model="tweetText" id="tweetText" name="tweetText" cols="30" rows="10" />
    <button class="tweetBtn" @click="tweet">投稿</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweetText: '',
    }
  },
  methods: {
    tweet() {
      console.log(this.tweetText)
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
