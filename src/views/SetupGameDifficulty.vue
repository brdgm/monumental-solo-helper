<template>
  <h1>{{t('setup.title')}}</h1>

  <SelectExpansion/>
  <SelectModules/>
  <DifficultyLevel/>

  <router-link to="/setup/civilization" class="btn btn-primary btn-lg mt-3">
    {{t('action.selectCivilization')}}
  </router-link>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import SelectExpansion from '@/components/setup/SelectExpansion.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import SelectModules from '@/components/setup/SelectModules.vue'

export default defineComponent({
  name: 'SetupGameDifficulty',
  components: {
    SelectExpansion,
    SelectModules,
    DifficultyLevel,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
