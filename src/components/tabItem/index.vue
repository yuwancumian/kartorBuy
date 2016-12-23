<template>
  <li 
    @click="$parent.$emit('input', id)"
    :class="{ 'active': $parent.value === id }">
    <a >
      <slot></slot>
    </a>
  </li>
</template>

<script>
  export default {
    props: ['id'],
    methods: {
      handleClick (){
        console.log('111')
      }
    }
  }
</script>

<style lang="less">

</style>
