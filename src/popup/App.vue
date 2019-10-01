<template>
  <div id="popup">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss">
#popup {
  width: 320px;
}

*,
::before,
::after {
  box-sizing: border-box;
}
</style>
