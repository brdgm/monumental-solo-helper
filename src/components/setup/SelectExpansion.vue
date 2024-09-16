<template>
  <h3 class="mt-3 mb-3">{{t('setup.selectExpansion.title')}}</h3>
  <div class="row">
    <div class="col-md-3 col-5">
      <img src="@/assets/game-monumental.jpg" class="game" alt=""/>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="coreBoxEnabled" checked disabled>
        <label class="form-check-label" for="coreBoxEnabled">
          {{t('setup.selectExpansion.coreBox')}}
        </label>
      </div>
    </div>
    <div class="col-md-3 col-5">
      <img src="@/assets/game-monumental-lost-kingdoms.jpg" class="game selectable" alt="" :class="{disabled: !hasLostKingdoms}"
          @click="toggleLostKingdoms"/>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="lostKingdomsEnabled" 
            :checked="hasLostKingdoms" @click="toggleLostKingdoms">
        <label class="form-check-label" for="lostKingdomsEnabled">
          {{t('setup.selectExpansion.lostKingdoms')}}
        </label>
      </div>
    </div>
    <div class="col-md-3 col-5">
      <img src="@/assets/game-monumental-african-empires.jpg" class="game selectable" alt="" :class="{disabled: !hasAfricanEmpires}"
          @click="toggleAfricanEmpires"/>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="africanEmpiresEnabled"
            :checked="hasAfricanEmpires" @click="toggleAfricanEmpires">
        <label class="form-check-label" for="africanEmpiresEnabled">
          {{t('setup.selectExpansion.africanEmpires')}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'
import Module from '@/services/enum/Module';

export default defineComponent({
  name: 'SelectExpansion',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasLostKingdoms() : boolean {
      return this.state.setup.expansions.includes(Expansion.LOST_KINGDOMS)
    },
    hasAfricanEmpires() : boolean {
      return this.state.setup.expansions.includes(Expansion.AFRICAN_EMPIRES)
    }
  },
  methods: {
    toggleLostKingdoms() {
      this.state.setupToggleExpansionLostKingdoms()
    },
    toggleAfricanEmpires() {
      this.state.setupToggleExpansionAfricanEmpires()
      if (!this.hasAfricanEmpires) {
        this.state.setup.modules = this.state.setup.modules.filter(module => module != Module.QUESTS)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.game {
  width: 100%;
}
.game.selectable {
  cursor: pointer
}
.game.disabled {
  opacity: 0.4;
  filter: grayscale(1);
}
</style>
