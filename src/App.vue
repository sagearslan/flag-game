<template>
  <div id="flag-game">
    <div v-if="showCelebration">
      <Celebration :flag="currentFlag" />
    </div>
    <div v-else>
      <div class="flag-container">
        <img :src="currentFlag.flag" alt="Country Flag" />
      </div>
      <div class="options">
        <button
            v-for="(option, index) in options"
            :key="index"
            @click="checkAnswer(option)"
            :class="getButtonClass(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>
    <div class="bottom-bar">
      <div>Current streak: <b>{{ streak }}</b></div>
      <div>
        <span v-if="showHint" class="hint">{{ correctAnswer }} :)</span>
        <span v-else @click="showHint = true" class="hint">Help</span>
      </div>
    </div>
  </div>
<!--  <div class="flag-game">
    <div v-if="showCelebration">
      <Celebration :flag="currentFlag" />
    </div>
    <div v-else>
      <div class="flag-container">
        <img :src="currentFlag.flag" alt="Country Flag" />
      </div>
      <div class="options">
        <button
            v-for="(option, index) in options"
            :key="index"
            @click="checkAnswer(option)"
            :class="getButtonClass(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>
    <div class="bottom-bar">
      <small class="streak">Current Streak: {{ streak }}</small>
      <small v-if="showHint" class="hint">The correct answer is {{ correctAnswer }}</small>
      <small v-else @click="showHint = true" class="hint">Help</small>
    </div>
  </div>-->
</template>
<script>
import Celebration from './components/Celebration.vue';
import flags from './constants/flags';

export default {
  components: {
    Celebration,
  },
  data() {
    return {
      flags,
      currentFlag: {},
      options: [],
      streak: 0,
      showCelebration: false,
      selectedOption: null,
      showHint: false,
    };
  },
  mounted() {
    this.nextFlag();
  },
  methods: {
    nextFlag() {
      this.showHint = false;
      this.showCelebration = false;
      this.selectedOption = null;
      this.currentFlag = this.flags[Math.floor(Math.random() * this.flags.length)];
      this.options = this.generateOptions(this.currentFlag.name);
    },
    generateOptions(correctAnswer) {
      let options = [correctAnswer];
      while (options.length < 4) {
        let option = this.flags[Math.floor(Math.random() * this.flags.length)].name;
        if (!options.includes(option)) {
          options.push(option);
        }
      }
      return options.sort(() => Math.random() - 0.5);
    },
    checkAnswer(option) {
      this.selectedOption = option;
      if (option === this.currentFlag.name) {
        this.streak++;
        this.showCelebration = true;
        setTimeout(this.nextFlag, 2000);
      } else {
        this.streak = 0;
      }
    },
    getButtonClass(option) {
      if (this.selectedOption === null) return '';
      return option === this.currentFlag.name
          ? 'correct'
          : this.selectedOption === option
              ? 'incorrect'
              : '';
    },
  },
  computed: {
    correctAnswer() {
      return this.currentFlag.name;
    },
  },
};
</script>

<style scoped>

</style>