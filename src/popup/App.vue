<template>
  <div id="popup" :style="styles">
    <router-view />
  </div>
</template>

<script>
import Browser from 'webextension-polyfill'

export default {
  data() {
    return {
      styles: {
        '--width': '320px',
        '--fontSize': '12px',
      },
    }
  },

  async mounted() {
    const data = await Browser.storage.local.get({
      screenWidth: '320',
      fontSize: '12',
    })
    this.styles['--width'] = `${data.screenWidth}px`
    this.styles['--fontSize'] = `${data.fontSize}px`
  },
}
</script>

<style lang="scss">
#popup {
  --width: 320px;
  --fontSize: 12px;
  width: var(--width);
  * {
    font-size: var(--fontSize);
  }
}

*,
::before,
::after {
  box-sizing: border-box;
}
</style>
