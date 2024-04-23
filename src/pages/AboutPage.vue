<template>
  <q-page>
    <q-card flat>
      <div class="title text-center">
        <h4>
          PRACTICE TEST
          <br />
          2024.04.22
        </h4>
        <h5>
          Giovanni Cappelletti
          <br />
          <a href="https://methodwolf.com/" target="_blank">methodwolf.com</a>
        </h5>
      </div>
      <q-separator class="q-mb-lg" />
      <doc-component />
      <q-separator class="q-mb-lg" />
      <request-component />
    </q-card>
  </q-page>
</template>

<script setup>
import RequestComponent from "@/components/About/RequestComponent.vue";
import DocComponent from "@/components/About/DocComponent.vue";
</script>
