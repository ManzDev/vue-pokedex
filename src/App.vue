<template>
  <poke-dex :id="id"></poke-dex>
</template>

<script>
//import background from '~/assets/background.jpg';
import PokeDex from '~/components/PokeDex.vue';

export default {
  name: 'App',
  components: { 'poke-dex': PokeDex },
  computed: {
    id() {
      return Number(this.$route.params.id)
    }
  }
}
</script>


<style>
  body {
    margin: 0;
    background: url(../assets/background.jpg);
    background-position: bottom;
    height: 100vh;
  }

  h1 {
    font-family: Montserrat, Impact, sans-serif;
    font-size: 72px;
  }
</style>
