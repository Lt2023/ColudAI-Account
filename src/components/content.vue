<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.content {
  width: 350px;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(50px);
  border: 6px solid #4C81FF;
  box-sizing: content-box;
  padding: 30px 20px 15px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>