<template>
  <h3 class="mt-4 mb-3">{{t('setup.selectModules.title')}}</h3>
  <div class="row">
    <div class="col">
      <div class="form-check form-switch" v-for="item of modules" :key="item">
        <label class="form-check-label" :class="{'text-muted':!isAvailable(item)}">
          <input class="form-check-input" type="checkbox" :checked="hasModule(item)" @input="toggleModule(item)" :disabled="!isAvailable(item)">
          {{t(`module.${item}`)}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'
import Module from '@/services/enum/Module'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'SelectModules',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    modules() : Module[] {
      return Object.values(Module)
    },
    hasAfricanEmpiresExpansion() {
      return this.state.setup.expansions.includes(Expansion.AFRICAN_EMPIRES)
    }
  },
  methods: {
    hasModule(module : Module) : boolean {
      return (this.state.setup.modules ?? []).includes(module)
    },
    toggleModule(module : Module) {
      if (!this.state.setup.modules) {
        this.state.setup.modules = []
      }
      toggleArrayItem(this.state.setup.modules, module)
    },
    isAvailable(module : Module) : boolean {
      if ([Module.NATURAL_WONDERS,Module.FUTURE_ERA,Module.QUESTS].includes(module)) {
        return this.hasAfricanEmpiresExpansion
      }
      return true
    }
  }
})
</script>
