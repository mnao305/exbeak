<template>
  <div>
    <dl>
      <dt>画面横幅</dt>
      <dd><input type="number" min="0" v-model="screenWidth" /> px</dd>
      <dt>文字サイズ</dt>
      <dd><input type="number" min="0" v-model="fontSize" /> px</dd>
      <dt>入力欄縦幅</dt>
      <dd><input type="number" min="0" v-model="tweetRowSize" /></dd>
      <dt>
        <button @click="configSave">保存</button><span class="message">{{ message }}</span>
      </dt>
    </dl>
  </div>
</template>

<script>
import Browser from 'webextension-polyfill'
export default {
  name: 'App',
  data() {
    return {
      screenWidth: '320',
      fontSize: '12',
      tweetRowSize: '10',
      message: '',
    }
  },
  mounted() {
    this.defaultConfig()
  },
  methods: {
    async defaultConfig() {
      const data = await Browser.storage.local.get({
        screenWidth: 320,
        fontSize: 12,
        tweetRowSize: '10',
      })
      this.screenWidth = data.screenWidth
      this.fontSize = data.fontSize
      this.tweetRowSize = data.tweetRowSize
    },
    configSave() {
      Browser.storage.local.set({
        screenWidth: this.screenWidth,
        fontSize: this.fontSize,
        tweetRowSize: this.tweetRowSize,
      })

      this.message = '保存しました'
      setTimeout(() => {
        this.message = ''
      }, 1000)
    },
  },
}
</script>

<style scoped>
p {
  font-size: 20px;
}
input {
  width: 60px;
}
dd {
  margin-bottom: 10px;
}

.message {
  margin-left: 6px;
}
</style>
