<template>
  <div ref="celebration" class="celebration">
    <b>{{ flag.name }}</b><br>is correct!
  </div>
</template>

<script>
import party from 'party-js';

export default {
  props: ["flag"],
  mounted() {
    this.playAnimation();
  },
  methods: {
    playAnimation() {
      party.confetti(this.$refs.celebration, {
        spread: party.variation.range(60, 80),
        count: party.variation.range(60, 80),
        size: party.variation.range(0.5, 1.5),
      });
      setTimeout(() => {
        this.$emit('animation-finished');
      }, 2000);
    },
  },
};
</script>

<style scoped>
.celebration {
  font-size: 2rem;
  color: green;
  text-align: center;
}
</style>
