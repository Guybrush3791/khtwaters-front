<template>
  <q-card-section>
    <q-list dense>
      <template v-for="node in nodes" :key="node.label">
        <q-item clickable v-ripple>
          <q-item-section>{{ node.label }}</q-item-section>
        </q-item>
        <q-item-label v-if="node.children">
          <tree-view :nodes="node.children" />
        </q-item-label>
      </template>
    </q-list>
  </q-card-section>
</template>

<script setup>
import TreeView from "./TreeView.vue";

const props = defineProps({
  nodes: Array,
});
</script>
