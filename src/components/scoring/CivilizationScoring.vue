<template> 
  <table class="scoringTable">
    <thead>
      <tr>
        <td class="text-muted text-start">{{t('scoring.playedRounds', {count:roundCount})}}</td>
        <td v-for="(civilization,index) in playerCivilization" :key="civilization" colspan="2" class="civilization">
          <CivilizationIconName :name="civilization"/>
          <div class="small text-muted">{{t('roundPlayer.title', {player:index+1}, playerCount)}}</div>
        </td>
        <td v-for="(civilization,index) in botCivilization" :key="civilization" colspan="2" class="civilization">
          <CivilizationIconName :name="civilization"/>
          <div class="small text-muted">{{t('roundBot.title', {bot:index+1}, botCount)}}</div>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">{{t('scoring.knowledgeCards')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="knowledgeCardCount[playerIndex-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="knowledgeCardVP[playerIndex-1]" :dominance-value="knowledgeCardDominanceVP[playerIndex-1]"/>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="knowledgeCardCount[botIndex+playerCount-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="knowledgeCardVP[botIndex+playerCount-1]" :dominance-value="knowledgeCardDominanceVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
      <tr>
        <th scope="row">{{t('scoring.wonderCards')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="wonderCardCount[playerIndex-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="wonderCardVP[playerIndex-1]" :dominance-value="wonderCardDominanceVP[playerIndex-1]"/>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="wonderCardCount[botIndex+playerCount-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="wonderCardVP[botIndex+playerCount-1]" :dominance-value="wonderCardDominanceVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
      <tr>
        <th scope="row">{{t('scoring.culturalPolicies')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="culturalPolicyCount[playerIndex-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="culturalPolicyVP[playerIndex-1]" :dominance-value="culturalPolicyDominanceVP[playerIndex-1]"/>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="culturalPolicyCount[botIndex+playerCount-1]" disabled></td>
          <tdScore :value="culturalPolicyVP[botIndex+playerCount-1]" :dominance-value="culturalPolicyDominanceVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
      <tr>
        <th scope="row">{{t('scoring.provinces')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="provinceCount[playerIndex-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="provinceVP[playerIndex-1]" :dominance-value="provinceDominanceVP[playerIndex-1]"/>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="provinceCount[botIndex+playerCount-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="provinceVP[botIndex+playerCount-1]" :dominance-value="provinceDominanceVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
      <tr v-if="hasMonstersModule">
        <th scope="row">{{t('scoring.monster')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="monsterCount[playerIndex-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="monsterVP[playerIndex-1]"/>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="monsterCount[botIndex+playerCount-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="monsterVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
      <tr v-if="hasNaturalWondersModule">
        <th scope="row">{{t('scoring.naturalWonders')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="naturalWondersCount[playerIndex-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="naturalWondersVP[playerIndex-1]"/>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="naturalWondersCount[botIndex+playerCount-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="naturalWondersVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
      <tr v-if="hasFutureEraModule">
        <th scope="row">{{t('scoring.futureEra')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"><input type="number" min="0" max="4" v-model="futureEraCount[playerIndex-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="futureEraVP[playerIndex-1]"/>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"><input type="number" min="0" max="4" v-model="futureEraCount[botIndex+playerCount-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="futureEraVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
      <tr v-if="hasQuestsModule">
        <th scope="row">{{t('scoring.quests')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"><input type="number" min="0" max="2" v-model="questCount[playerIndex-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="questVP[playerIndex-1]"/>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"><input type="number" min="0" max="1" v-model="questCount[botIndex+playerCount-1]" @change="persist" @focus="inputSelectAll"></td>
          <tdScore :value="questVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
      <tr>
        <th scope="row">{{t('scoring.gold')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"></td>
          <td class="score"></td>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"><input type="number" min="0" max="99" v-model="botGold[botIndex-1]" disabled></td>
          <tdScore :value="goldVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
      <tr class="total">
        <th scope="row">{{t('scoring.total')}}</th>
        <template v-for="playerIndex in playerCount" :key="playerIndex">
          <td class="count"></td>
          <tdScore :value="totalVP[playerIndex-1]"/>
        </template>
        <template v-for="botIndex in botCount" :key="botIndex">
          <td class="count"></td>
          <tdScore :value="totalVP[botIndex+playerCount-1]"/>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { fill, max } from 'lodash'
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CivilizationIconName from '@/components/structure/CivilizationIconName.vue'
import tdScore from './ScoreCell.vue'
import Bot from '@/services/Bot'
import Module from '@/services/enum/Module'

export default defineComponent({
  name: 'CivilizationScoring',
  components: {
    CivilizationIconName,
    tdScore
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const playerCivilization = state.setup.civilizations.playerCivilization
    const playerCount = state.setup.civilizations.playerCivilization.length
    const botCivilization = state.setup.civilizations.botCivilization
    const botCount = state.setup.civilizations.botCivilization.length
    const roundCount = state.rounds.length

    // get gold and cultural policies from bots
    const botGold : number[] = []
    const botCulturalPolicies : number[] = []
    for (let i=0; i<botCount; i++) {
      botGold[i] = 0
      botCulturalPolicies[i] = 0
      for (let roundIndex=state.rounds.length-1; roundIndex>=0; roundIndex--) {
        const round = state.rounds[roundIndex]
        if (i < round.bots.length) {
          const bot = Bot.fromPersistence(round.bots[i])
          botGold[i] = bot.goldTotal
          botCulturalPolicies[i] = bot.culturalPolicies
          break
        }
      }
    }

    const scoring = state.scoring
    const knowledgeCardCount = ref(scoring?.knowledgeCardCount ?? fill(Array(playerCount+botCount),0))
    const wonderCardCount = ref(scoring?.wonderCardCount ?? fill(Array(playerCount+botCount),0))
    const culturalPolicyCount = ref([...scoring?.culturalPolicyCountPlayer ?? fill(Array(playerCount),0), ...botCulturalPolicies])
    const provinceCount = ref(scoring?.provinceCount ?? fill(Array(playerCount+botCount),0))
    const monsterCount = ref([...scoring?.monsterCount ?? fill(Array(playerCount+botCount),0)])
    const naturalWondersCount = ref([...scoring?.naturalWondersCount ?? fill(Array(playerCount+botCount),0)])
    const futureEraCount = ref([...scoring?.futureEraCount ?? fill(Array(playerCount+botCount),0)])
    const questCount = ref([...scoring?.questCount ?? fill(Array(playerCount+botCount),0)])

    const knowledgeCardVP = computed({
      get: () => knowledgeCardCount.value,
      set: (v) => v
    })
    const knowledgeCardDominanceVP = computed({
      get: () => knowledgeCardCount.value.map(c => c>0 && c==max(knowledgeCardCount.value) ? 3 : 0),
      set: (v) => v
    })
    const wonderCardVP = computed({
      get: () => wonderCardCount.value.map(c => c*2),
      set: (v) => v
    })
    const wonderCardDominanceVP = computed({
      get: () =>  wonderCardCount.value.map(c => c>0 && c==max( wonderCardCount.value) ? 3 : 0),
      set: (v) => v
    })
    const culturalPolicyVP = computed({
      get: () => culturalPolicyCount.value.map(c => c*2),
      set: (v) => v
    })
    const culturalPolicyDominanceVP = computed({
      get: () => culturalPolicyCount.value.map(c => c>0 && c==max(culturalPolicyCount.value) ? 3 : 0),
      set: (v) => v
    })
    const provinceVP = computed({
      get: () => provinceCount.value,
      set: (v) => v
    })
    const provinceDominanceVP = computed({
      get: () => provinceCount.value.map(c => c>0 && c==max(provinceCount.value) ? 3 : 0),
      set: (v) => v
    })
    const monsterVP = computed({
      get: () => monsterCount.value,
      set: (v) => v
    })
    const naturalWondersVP = computed({
      get: () => naturalWondersCount.value,
      set: (v) => v
    })
    const futureEraVP = computed({
      get: () => futureEraCount.value,
      set: (v) => v
    })
    const questVP = computed({
      get: () => questCount.value.map(c => c*2),
      set: (v) => v
    })
    const goldVP =  [...fill(Array(playerCount),0), ...botGold.map(gold => Math.floor(gold / 3))]
    const totalVP = computed({
      get: () => {
        const result : number[] = []
        for (let i=0; i<playerCount+botCount;i++) {
          result[i] = knowledgeCardVP.value[i] + knowledgeCardDominanceVP.value[i]
              + wonderCardVP.value[i] + wonderCardDominanceVP.value[i]
              + culturalPolicyVP.value[i] + culturalPolicyDominanceVP.value[i]
              + provinceVP.value[i] + provinceDominanceVP.value[i]
              + monsterVP.value[i]
              + naturalWondersVP.value[i]
              + futureEraVP.value[i]
              + questVP.value[i]
              + goldVP[i]
        }
        return result
      },
      set: (v) => v
    })

    return { t, state, playerCivilization, playerCount, botCivilization, botCount, roundCount,
      knowledgeCardCount, knowledgeCardVP, knowledgeCardDominanceVP,
      wonderCardCount, wonderCardVP, wonderCardDominanceVP,
      culturalPolicyCount, culturalPolicyVP, culturalPolicyDominanceVP,
      provinceCount, provinceVP, provinceDominanceVP,
      monsterCount, monsterVP,
      naturalWondersCount, naturalWondersVP,
      futureEraCount, futureEraVP,
      questCount, questVP,
      botGold, goldVP,
      totalVP
    }
  },
  computed: {
    hasMonstersModule() : boolean {
      return this.state.setup.modules.includes(Module.MONSTERS)
    },
    hasNaturalWondersModule() : boolean {
      return this.state.setup.modules.includes(Module.NATURAL_WONDERS)
    },
    hasFutureEraModule() : boolean {
      return this.state.setup.modules.includes(Module.FUTURE_ERA)
    },
    hasQuestsModule() : boolean {
      return this.state.setup.modules.includes(Module.QUESTS)
    }
  },
  methods: {
    persist() {
      this.state.scoring = {
        knowledgeCardCount: this.knowledgeCardCount,
        wonderCardCount: this.wonderCardCount,
        culturalPolicyCountPlayer: this.culturalPolicyCount.slice(0, this.playerCount),
        provinceCount: this.provinceCount,
        monsterCount: this.monsterCount,
        naturalWondersCount: this.naturalWondersCount,
        futureEraCount: this.futureEraCount,
        questCount: this.questCount
      }
    },
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    }
  }
})
</script>

<style lang="scss" scoped>
.scoringTable {
  width: 100%;
  border-collapse: collapse;
  tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
  th, td {
    border-collapse: collapse;
    min-width: 3rem;
    padding: 1rem 0.2rem 1rem 0.2rem;
  }
  td {
    text-align: center;
  }
  td.civilization, td.count {
    border-left: 0.5px solid black;
  }
  input {
    width: 3rem;
  }
  tr.total {
    border-top: 2px solid #888;
    font-weight: bold;
  }
}
</style>