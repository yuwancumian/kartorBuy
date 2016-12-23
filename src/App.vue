<template>
  <router-view>
</template>

<script>
export default {
  mounted(){
    localStorage.setItem("user_id", 1)
    localStorage.setItem("order_id", 1)
    localStorage.setItem("store_id", 1)
  }
}
</script>

