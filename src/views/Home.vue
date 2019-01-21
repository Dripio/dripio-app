<template>
  <div class="home">
    <GardenList />
  </div>
</template>

<script>
import firebase from 'firebase';
import GardenList from '@/components/GardenList.vue'

export default {
  name: 'home',
  components: {
    GardenList
  }
}
</script>
