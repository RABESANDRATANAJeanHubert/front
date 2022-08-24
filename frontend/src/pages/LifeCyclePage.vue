<template>
  <table v-for="lists in list" :key="lists">
  <td>
    <th>
      {{lists}}
    </th>
  </td>
  </table>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const list = ['jaune', 'rouge', 'bleu'];
    onMounted(async () => {
      list;
    });
    return {list}
  },
});
</script>
