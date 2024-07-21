<template>
  <div class="flag-game">
    <h1>What's this flag?</h1>
    <div v-if="showCelebration">
      <Celebration />
    </div>
    <div v-else>
      <img :src="currentFlag.flag" alt="Country Flag" />
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
      <p>Current Streak: {{ streak }}</p>
      <small v-if="showHint" class="hint">The correct answer is {{ correctAnswer }}</small>
      <small v-else @click="showHint = true" class="hint">Help</small>
    </div>
  </div>
</template>

<script>
import Celebration from './components/Celebration.vue';

const flags = [
  { name: 'Afghanistan', flag: 'https://www.worldometers.info/img/flags/af-flag.gif' },
  { name: 'Albania', flag: 'https://www.worldometers.info/img/flags/al-flag.gif' },
  { name: 'Algeria', flag: 'https://www.worldometers.info/img/flags/ag-flag.gif' },
  { name: 'Andorra', flag: 'https://www.worldometers.info/img/flags/an-flag.gif' },
  { name: 'Angola', flag: 'https://www.worldometers.info/img/flags/ao-flag.gif' },
  { name: 'Antigua and Barbuda', flag: 'https://www.worldometers.info/img/flags/ac-flag.gif' },
  { name: 'Argentina', flag: 'https://www.worldometers.info/img/flags/ar-flag.gif' },
  { name: 'Armenia', flag: 'https://www.worldometers.info/img/flags/am-flag.gif' },
  { name: 'Australia', flag: 'https://www.worldometers.info/img/flags/as-flag.gif' },
  { name: 'Austria', flag: 'https://www.worldometers.info/img/flags/au-flag.gif' },
  { name: 'Azerbaijan', flag: 'https://www.worldometers.info/img/flags/aj-flag.gif' },
  { name: 'Bahamas', flag: 'https://www.worldometers.info/img/flags/bf-flag.gif' },
  { name: 'Bahrain', flag: 'https://www.worldometers.info/img/flags/ba-flag.gif' },
  { name: 'Bangladesh', flag: 'https://www.worldometers.info/img/flags/bg-flag.gif' },
  { name: 'Barbados', flag: 'https://www.worldometers.info/img/flags/bb-flag.gif' },
  { name: 'Belarus', flag: 'https://www.worldometers.info/img/flags/bo-flag.gif' },
  { name: 'Belgium', flag: 'https://www.worldometers.info/img/flags/be-flag.gif' },
  { name: 'Belize', flag: 'https://www.worldometers.info/img/flags/bh-flag.gif' },
  { name: 'Benin', flag: 'https://www.worldometers.info/img/flags/bn-flag.gif' },
  { name: 'Bhutan', flag: 'https://www.worldometers.info/img/flags/bt-flag.gif' },
  { name: 'Bolivia', flag: 'https://www.worldometers.info/img/flags/bl-flag.gif' },
  { name: 'Bosnia and Herzegovina', flag: 'https://www.worldometers.info/img/flags/bk-flag.gif' },
  { name: 'Botswana', flag: 'https://www.worldometers.info/img/flags/bc-flag.gif' },
  { name: 'Brazil', flag: 'https://www.worldometers.info/img/flags/br-flag.gif' },
  { name: 'Brunei', flag: 'https://www.worldometers.info/img/flags/bx-flag.gif' },
  { name: 'Bulgaria', flag: 'https://www.worldometers.info/img/flags/bu-flag.gif' },
  { name: 'Burkina Faso', flag: 'https://www.worldometers.info/img/flags/uv-flag.gif' },
  { name: 'Burundi', flag: 'https://www.worldometers.info/img/flags/by-flag.gif' },
  { name: 'Cabo Verde', flag: 'https://www.worldometers.info/img/flags/cv-flag.gif' },
  { name: 'Cambodia', flag: 'https://www.worldometers.info/img/flags/cb-flag.gif' },
  { name: 'Cameroon', flag: 'https://www.worldometers.info/img/flags/cm-flag.gif' },
  { name: 'Canada', flag: 'https://www.worldometers.info/img/flags/ca-flag.gif' },
  { name: 'Central African Republic', flag: 'https://www.worldometers.info/img/flags/ct-flag.gif' },
  { name: 'Chad', flag: 'https://www.worldometers.info/img/flags/cd-flag.gif' },
  { name: 'Chile', flag: 'https://www.worldometers.info/img/flags/ci-flag.gif' },
  { name: 'China', flag: 'https://www.worldometers.info/img/flags/ch-flag.gif' },
  { name: 'Colombia', flag: 'https://www.worldometers.info/img/flags/co-flag.gif' },
  { name: 'Comoros', flag: 'https://www.worldometers.info/img/flags/cn-flag.gif' },
  { name: 'Congo, Democratic Republic of the', flag: 'https://www.worldometers.info/img/flags/cg-flag.gif' },
  { name: 'Congo, Republic of the', flag: 'https://www.worldometers.info/img/flags/cf-flag.gif' },
  { name: 'Costa Rica', flag: 'https://www.worldometers.info/img/flags/cs-flag.gif' },
  { name: 'Croatia', flag: 'https://www.worldometers.info/img/flags/hr-flag.gif' },
  { name: 'Cuba', flag: 'https://www.worldometers.info/img/flags/cu-flag.gif' },
  { name: 'Cyprus', flag: 'https://www.worldometers.info/img/flags/cy-flag.gif' },
  { name: 'Czech Republic', flag: 'https://www.worldometers.info/img/flags/ez-flag.gif' },
  { name: 'Denmark', flag: 'https://www.worldometers.info/img/flags/da-flag.gif' },
  { name: 'Djibouti', flag: 'https://www.worldometers.info/img/flags/dj-flag.gif' },
  { name: 'Dominica', flag: 'https://www.worldometers.info/img/flags/do-flag.gif' },
  { name: 'Dominican Republic', flag: 'https://www.worldometers.info/img/flags/dr-flag.gif' },
  { name: 'East Timor', flag: 'https://www.worldometers.info/img/flags/tt-flag.gif' },
  { name: 'Ecuador', flag: 'https://www.worldometers.info/img/flags/ec-flag.gif' },
  { name: 'Egypt', flag: 'https://www.worldometers.info/img/flags/eg-flag.gif' },
  { name: 'El Salvador', flag: 'https://www.worldometers.info/img/flags/es-flag.gif' },
  { name: 'Equatorial Guinea', flag: 'https://www.worldometers.info/img/flags/ek-flag.gif' },
  { name: 'Eritrea', flag: 'https://www.worldometers.info/img/flags/er-flag.gif' },
  { name: 'Estonia', flag: 'https://www.worldometers.info/img/flags/en-flag.gif' },
  { name: 'Eswatini', flag: 'https://www.worldometers.info/img/flags/wz-flag.gif' },
  { name: 'Ethiopia', flag: 'https://www.worldometers.info/img/flags/et-flag.gif' },
  { name: 'Fiji', flag: 'https://www.worldometers.info/img/flags/fj-flag.gif' },
  { name: 'Finland', flag: 'https://www.worldometers.info/img/flags/fi-flag.gif' },
  { name: 'France', flag: 'https://www.worldometers.info/img/flags/fr-flag.gif' },
  { name: 'Gabon', flag: 'https://www.worldometers.info/img/flags/gb-flag.gif' },
  { name: 'Gambia', flag: 'https://www.worldometers.info/img/flags/ga-flag.gif' },
  { name: 'Georgia', flag: 'https://www.worldometers.info/img/flags/gg-flag.gif' },
  { name: 'Germany', flag: 'https://www.worldometers.info/img/flags/gm-flag.gif' },
  { name: 'Ghana', flag: 'https://www.worldometers.info/img/flags/gh-flag.gif' },
  { name: 'Greece', flag: 'https://www.worldometers.info/img/flags/gr-flag.gif' },
  { name: 'Grenada', flag: 'https://www.worldometers.info/img/flags/gj-flag.gif' },
  { name: 'Guatemala', flag: 'https://www.worldometers.info/img/flags/gt-flag.gif' },
  { name: 'Guinea', flag: 'https://www.worldometers.info/img/flags/gv-flag.gif' },
  { name: 'Guinea-Bissau', flag: 'https://www.worldometers.info/img/flags/pu-flag.gif' },
  { name: 'Guyana', flag: 'https://www.worldometers.info/img/flags/gy-flag.gif' },
  { name: 'Haiti', flag: 'https://www.worldometers.info/img/flags/ha-flag.gif' },
  { name: 'Honduras', flag: 'https://www.worldometers.info/img/flags/ho-flag.gif' },
  { name: 'Hungary', flag: 'https://www.worldometers.info/img/flags/hu-flag.gif' },
  { name: 'Iceland', flag: 'https://www.worldometers.info/img/flags/ic-flag.gif' },
  { name: 'India', flag: 'https://www.worldometers.info/img/flags/in-flag.gif' },
  { name: 'Indonesia', flag: 'https://www.worldometers.info/img/flags/id-flag.gif' },
  { name: 'Iran', flag: 'https://www.worldometers.info/img/flags/ir-flag.gif' },
  { name: 'Iraq', flag: 'https://www.worldometers.info/img/flags/iz-flag.gif' },
  { name: 'Ireland', flag: 'https://www.worldometers.info/img/flags/ei-flag.gif' },
  { name: 'Israel', flag: 'https://www.worldometers.info/img/flags/is-flag.gif' },
  { name: 'Italy', flag: 'https://www.worldometers.info/img/flags/it-flag.gif' },
  { name: 'Ivory Coast', flag: 'https://www.worldometers.info/img/flags/iv-flag.gif' },
  { name: 'Jamaica', flag: 'https://www.worldometers.info/img/flags/jm-flag.gif' },
  { name: 'Japan', flag: 'https://www.worldometers.info/img/flags/ja-flag.gif' },
  { name: 'Jordan', flag: 'https://www.worldometers.info/img/flags/jo-flag.gif' },
  { name: 'Kazakhstan', flag: 'https://www.worldometers.info/img/flags/kz-flag.gif' },
  { name: 'Kenya', flag: 'https://www.worldometers.info/img/flags/ke-flag.gif' },
  { name: 'Kiribati', flag: 'https://www.worldometers.info/img/flags/kr-flag.gif' },
  { name: 'Korea, North', flag: 'https://www.worldometers.info/img/flags/kn-flag.gif' },
  { name: 'Korea, South', flag: 'https://www.worldometers.info/img/flags/ks-flag.gif' },
  { name: 'Kuwait', flag: 'https://www.worldometers.info/img/flags/ku-flag.gif' },
  { name: 'Kyrgyzstan', flag: 'https://www.worldometers.info/img/flags/kg-flag.gif' },
  { name: 'Laos', flag: 'https://www.worldometers.info/img/flags/la-flag.gif' },
  { name: 'Latvia', flag: 'https://www.worldometers.info/img/flags/lg-flag.gif' },
  { name: 'Lebanon', flag: 'https://www.worldometers.info/img/flags/le-flag.gif' },
  { name: 'Lesotho', flag: 'https://www.worldometers.info/img/flags/lt-flag.gif' },
  { name: 'Liberia', flag: 'https://www.worldometers.info/img/flags/li-flag.gif' },
  { name: 'Libya', flag: 'https://www.worldometers.info/img/flags/ly-flag.gif' },
  { name: 'Liechtenstein', flag: 'https://www.worldometers.info/img/flags/ls-flag.gif' },
  { name: 'Lithuania', flag: 'https://www.worldometers.info/img/flags/lh-flag.gif' },
  { name: 'Luxembourg', flag: 'https://www.worldometers.info/img/flags/lu-flag.gif' },
  { name: 'Madagascar', flag: 'https://www.worldometers.info/img/flags/ma-flag.gif' },
  { name: 'Malawi', flag: 'https://www.worldometers.info/img/flags/mi-flag.gif' },
  { name: 'Malaysia', flag: 'https://www.worldometers.info/img/flags/my-flag.gif' },
  { name: 'Maldives', flag: 'https://www.worldometers.info/img/flags/mv-flag.gif' },
  { name: 'Mali', flag: 'https://www.worldometers.info/img/flags/ml-flag.gif' },
  { name: 'Malta', flag: 'https://www.worldometers.info/img/flags/mt-flag.gif' },
  { name: 'Marshall Islands', flag: 'https://www.worldometers.info/img/flags/rm-flag.gif' },
  { name: 'Mauritania', flag: 'https://www.worldometers.info/img/flags/mr-flag.gif' },
  { name: 'Mauritius', flag: 'https://www.worldometers.info/img/flags/mp-flag.gif' },
  { name: 'Mexico', flag: 'https://www.worldometers.info/img/flags/mx-flag.gif' },
  { name: 'Micronesia', flag: 'https://www.worldometers.info/img/flags/fm-flag.gif' },
  { name: 'Moldova', flag: 'https://www.worldometers.info/img/flags/md-flag.gif' },
  { name: 'Monaco', flag: 'https://www.worldometers.info/img/flags/mn-flag.gif' },
  { name: 'Mongolia', flag: 'https://www.worldometers.info/img/flags/mg-flag.gif' },
  { name: 'Montenegro', flag: 'https://www.worldometers.info/img/flags/mj-flag.gif' },
  { name: 'Morocco', flag: 'https://www.worldometers.info/img/flags/mo-flag.gif' },
  { name: 'Mozambique', flag: 'https://www.worldometers.info/img/flags/mz-flag.gif' },
  { name: 'Myanmar', flag: 'https://www.worldometers.info/img/flags/bm-flag.gif' },
  { name: 'Namibia', flag: 'https://www.worldometers.info/img/flags/wa-flag.gif' },
  { name: 'Nauru', flag: 'https://www.worldometers.info/img/flags/nr-flag.gif' },
  { name: 'Nepal', flag: 'https://www.worldometers.info/img/flags/np-flag.gif' },
  { name: 'Netherlands', flag: 'https://www.worldometers.info/img/flags/nl-flag.gif' },
  { name: 'New Zealand', flag: 'https://www.worldometers.info/img/flags/nz-flag.gif' },
  { name: 'Nicaragua', flag: 'https://www.worldometers.info/img/flags/nu-flag.gif' },
  { name: 'Niger', flag: 'https://www.worldometers.info/img/flags/ng-flag.gif' },
  { name: 'Nigeria', flag: 'https://www.worldometers.info/img/flags/ni-flag.gif' },
  { name: 'North Macedonia', flag: 'https://www.worldometers.info/img/flags/mk-flag.gif' },
  { name: 'Norway', flag: 'https://www.worldometers.info/img/flags/no-flag.gif' },
  { name: 'Oman', flag: 'https://www.worldometers.info/img/flags/mu-flag.gif' },
  { name: 'Pakistan', flag: 'https://www.worldometers.info/img/flags/pk-flag.gif' },
  { name: 'Palau', flag: 'https://www.worldometers.info/img/flags/ps-flag.gif' },
  { name: 'Palestine', flag: 'https://www.worldometers.info/img/flags/pal-flag.gif' },
  { name: 'Panama', flag: 'https://www.worldometers.info/img/flags/pm-flag.gif' },
  { name: 'Papua New Guinea', flag: 'https://www.worldometers.info/img/flags/pp-flag.gif' },
  { name: 'Paraguay', flag: 'https://www.worldometers.info/img/flags/pa-flag.gif' },
  { name: 'Peru', flag: 'https://www.worldometers.info/img/flags/pe-flag.gif' },
  { name: 'Philippines', flag: 'https://www.worldometers.info/img/flags/rp-flag.gif' },
  { name: 'Poland', flag: 'https://www.worldometers.info/img/flags/pl-flag.gif' },
  { name: 'Portugal', flag: 'https://www.worldometers.info/img/flags/po-flag.gif' },
  { name: 'Qatar', flag: 'https://www.worldometers.info/img/flags/qa-flag.gif' },
  { name: 'Romania', flag: 'https://www.worldometers.info/img/flags/ro-flag.gif' },
  { name: 'Russia', flag: 'https://www.worldometers.info/img/flags/rs-flag.gif' },
  { name: 'Rwanda', flag: 'https://www.worldometers.info/img/flags/rw-flag.gif' },
  { name: 'Saint Kitts and Nevis', flag: 'https://www.worldometers.info/img/flags/sc-flag.gif' },
  { name: 'Saint Lucia', flag: 'https://www.worldometers.info/img/flags/st-flag.gif' },
  { name: 'Saint Vincent and the Grenadines', flag: 'https://www.worldometers.info/img/flags/vc-flag.gif' },
  { name: 'Samoa', flag: 'https://www.worldometers.info/img/flags/ws-flag.gif' },
  { name: 'San Marino', flag: 'https://www.worldometers.info/img/flags/sm-flag.gif' },
  { name: 'Sao Tome and Principe', flag: 'https://www.worldometers.info/img/flags/tp-flag.gif' },
  { name: 'Saudi Arabia', flag: 'https://www.worldometers.info/img/flags/sa-flag.gif' },
  { name: 'Senegal', flag: 'https://www.worldometers.info/img/flags/sg-flag.gif' },
  { name: 'Serbia', flag: 'https://www.worldometers.info/img/flags/ri-flag.gif' },
  { name: 'Seychelles', flag: 'https://www.worldometers.info/img/flags/se-flag.gif' },
  { name: 'Sierra Leone', flag: 'https://www.worldometers.info/img/flags/sl-flag.gif' },
  { name: 'Singapore', flag: 'https://www.worldometers.info/img/flags/sn-flag.gif' },
  { name: 'Slovakia', flag: 'https://www.worldometers.info/img/flags/lo-flag.gif' },
  { name: 'Slovenia', flag: 'https://www.worldometers.info/img/flags/si-flag.gif' },
  { name: 'Solomon Islands', flag: 'https://www.worldometers.info/img/flags/bp-flag.gif' },
  { name: 'Somalia', flag: 'https://www.worldometers.info/img/flags/so-flag.gif' },
  { name: 'South Africa', flag: 'https://www.worldometers.info/img/flags/sf-flag.gif' },
  { name: 'South Sudan', flag: 'https://www.worldometers.info/img/flags/od-flag.gif' },
  { name: 'Spain', flag: 'https://www.worldometers.info/img/flags/sp-flag.gif' },
  { name: 'Sri Lanka', flag: 'https://www.worldometers.info/img/flags/ce-flag.gif' },
  { name: 'Sudan', flag: 'https://www.worldometers.info/img/flags/su-flag.gif' },
  { name: 'Suriname', flag: 'https://www.worldometers.info/img/flags/ns-flag.gif' },
  { name: 'Sweden', flag: 'https://www.worldometers.info/img/flags/sw-flag.gif' },
  { name: 'Switzerland', flag: 'https://www.worldometers.info/img/flags/sz-flag.gif' },
  { name: 'Syria', flag: 'https://www.worldometers.info/img/flags/sy-flag.gif' },
  { name: 'Taiwan', flag: 'https://www.worldometers.info/img/flags/tw-flag.gif' },
  { name: 'Tajikistan', flag: 'https://www.worldometers.info/img/flags/ti-flag.gif' },
  { name: 'Tanzania', flag: 'https://www.worldometers.info/img/flags/tz-flag.gif' },
  { name: 'Thailand', flag: 'https://www.worldometers.info/img/flags/th-flag.gif' },
  { name: 'Togo', flag: 'https://www.worldometers.info/img/flags/to-flag.gif' },
  { name: 'Tonga', flag: 'https://www.worldometers.info/img/flags/tn-flag.gif' },
  { name: 'Trinidad and Tobago', flag: 'https://www.worldometers.info/img/flags/td-flag.gif' },
  { name: 'Tunisia', flag: 'https://www.worldometers.info/img/flags/ts-flag.gif' },
  { name: 'Turkey', flag: 'https://www.worldometers.info/img/flags/tu-flag.gif' },
  { name: 'Turkmenistan', flag: 'https://www.worldometers.info/img/flags/tx-flag.gif' },
  { name: 'Tuvalu', flag: 'https://www.worldometers.info/img/flags/tv-flag.gif' },
  { name: 'Uganda', flag: 'https://www.worldometers.info/img/flags/ug-flag.gif' },
  { name: 'Ukraine', flag: 'https://www.worldometers.info/img/flags/up-flag.gif' },
  { name: 'United Arab Emirates', flag: 'https://www.worldometers.info/img/flags/ae-flag.gif' },
  { name: 'United Kingdom', flag: 'https://www.worldometers.info/img/flags/uk-flag.gif' },
  { name: 'United States', flag: 'https://www.worldometers.info/img/flags/us-flag.gif' },
  { name: 'Uruguay', flag: 'https://www.worldometers.info/img/flags/uy-flag.gif' },
  { name: 'Uzbekistan', flag: 'https://www.worldometers.info/img/flags/uz-flag.gif' },
  { name: 'Vanuatu', flag: 'https://www.worldometers.info/img/flags/nh-flag.gif' },
  { name: 'Vatican City', flag: 'https://www.worldometers.info/img/flags/vt-flag.gif' },
  { name: 'Venezuela', flag: 'https://www.worldometers.info/img/flags/ve-flag.gif' },
  { name: 'Vietnam', flag: 'https://www.worldometers.info/img/flags/vm-flag.gif' },
  { name: 'Yemen', flag: 'https://www.worldometers.info/img/flags/ym-flag.gif' },
  { name: 'Zambia', flag: 'https://www.worldometers.info/img/flags/za-flag.gif' },
  { name: 'Zimbabwe', flag: 'https://www.worldometers.info/img/flags/zi-flag.gif' }
];

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

<style>
html, body {
  width: 100dvw;
  height: 100dvh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #333;
}

.flag-game {
  text-align: center;
  max-width: 90%;
  margin: auto;
}

.options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
  flex: 1 1 calc(50% - 20px);
  max-width: 200px;
}

button.correct {
  //background-color: green;
}

button.incorrect {
  color: white;
  background-color: red;
}

.hint {
  opacity: .5;
  cursor: pointer;
}

@media (min-width: 768px) {
  .flag-game {
    max-width: 600px;
  }

  button {
    flex: 1 1 calc(25% - 20px);
  }
}
</style>