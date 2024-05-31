<template>
  <main>
    <a-spin :spinning="spinning">
      <div class="bg">
        <slot></slot>
      </div>
    </a-spin>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  spinning: {
    type: Boolean,
    default: false
  }
})

let spinning = ref(false)

watch(() => props.spinning, (val) => {
  spinning.value = val
})
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
}
.bg {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/login_bg.png);
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
<style>
:where(.css-dev-only-do-not-override-1hsjdkk).ant-spin-nested-loading>div>.ant-spin {
  max-height: 100vh;
}
</style>