<template>
  <div>
    <i v-if="type === 'bookmark'" class="fas fa-bookmark" v-bind="iconProps"></i>
    <i v-if="type === 'views'" class="fas fa-eye" v-bind="iconProps"></i>
    <i v-if="type === 'comments'" class="fas fa-comment" v-bind="iconProps"></i>
  </div>
</template>

<script>
export default {
  name: 'FontAwesome',
  props: {
    type: {
      type: String,
      required: true
    },
    iconProps: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped></style>
