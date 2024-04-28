<template>
  <h1>{{round}}: {{t('roundBot.title', { bot: botIndex }, botCount )}} <CivilizationIconName :name="civilizationName"/></h1>

  <BotActions/>

  <FooterButtons endGameButtonType="finishGame" :backButtonRouteTo="backButtonRouteTo" roundResetTurnButton/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import CivilizationIconName from '@/components/structure/CivilizationIconName.vue'
import BotActions from '@/components/round/BotActions.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'RoundBot',
  components: {
    CivilizationIconName,
    BotActions,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, playerCount, botIndex, botCount } = navigationState
    const civilizationName = navigationState.civilizationName as string

    return { t, round, playerCount, botIndex, botCount, civilizationName }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.botIndex == 1) {
        return '/round/' + this.round + "/player/" + this.playerCount
      }
      else {
        return '/round/' + this.round + "/bot/" + (this.botIndex-1)
      }
    }
  }
})
</script>
