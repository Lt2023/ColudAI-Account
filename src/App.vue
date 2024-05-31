<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from "vue"

onMounted(() => {
  // 禁用复制
  document.onselectstart = new Function("event.returnValue=false")
  // 禁用右键
  document.oncontextmenu = new Function("event.returnValue=false")
  // 禁用F12
  document.addEventListener("keydown", function (e) {
    if (e.key == "F12") {
      e.preventDefault()
    }
  })
})
</script>