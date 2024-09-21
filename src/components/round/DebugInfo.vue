<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>civilization: </b>{{bot.civilization.name}} ({{bot.civilization.type}})<br/>
      <template v-if="cardDeck.openCards.length > 0">
        <b>openCards</b>: 
        <template v-for="card of cardDeck.openCards" :key="card">
          {{getCard(card)}}<br/>
        </template>
      </template>
      <b>drawPile</b>: {{cardDeck.drawPile}}<br/>
      <b>discardPile</b>: {{cardDeck.discardPile}}<br/>
      <b>nexusCards</b>: {{cardDeck.nexusCards}}<br/>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardDeckPersistence, useStateStore } from '@/store/state'
import Bot from '@/services/Bot'
import Cards from '@/services/Cards';
import Card from '@/services/Card';
import CardName from '@/services/enum/CardName';

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    bot: {
      type: Object as PropType<Bot>,
      required: true
    }
  },
  computed: {
    cardDeck() : CardDeckPersistence {
      return this.bot.cardDeck.toPersistence()
    }
  },
  methods: {
    getCard(name: CardName) : Card {
      return Cards.get(name)
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
