<template>
  <button @click="editItem">Edit</button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    editItem() {
      // You can add your edit logic here
      // For example, you can emit an event to inform the parent component
      this.$emit('edit', this.row); // Emit an 'edit' event with the current row data
    },
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
});
</script>