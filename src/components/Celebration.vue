<template>
  <div ref="celebration" class="celebration">
    🎉 Correct! 🎉
  </div>
</template>

<script>
import party from 'party-js';

export default {
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
}
</style>
