import {remove } from 'lodash'
import { defineStore } from 'pinia'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import CivilizationName from '@/services/enum/CivilizationName'
import Expansion from '@/services/enum/Expansion'
import CardName from '@/services/enum/CardName'
import toggleArrayItem from 'brdgm-commons/src/util/array/toggleArrayItem'
import Action from '@/services/enum/Action'
import { name } from '@/../package.json'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.BEGINNER,
        expansions: [],
        civilizations: {
          numberPlayers: 2,
          numberHumanPlayers: 1,
          playerCivilization: [],
          botCivilization: []
        }
      },
      rounds: []
    } as State
  },
  actions: {
    setupToggleExpansionLostKingdoms() {
      toggleArrayItem(this.setup.expansions, Expansion.LOST_KINGDOMS)
    },
    setupToggleExpansionAfricanEmpires() {
      toggleArrayItem(this.setup.expansions, Expansion.AFRICAN_EMPIRES)
    },
    setupDifficultyLevel(level: number) {
      this.setup.difficultyLevel = level
    },
    setupCivilizations(civilizations: CivilizationSetup) {
      this.setup.civilizations = civilizations
    },
    roundBot(data: RoundBotPayload) {
      // remove round from state if it already exists
      let round = this.rounds.find(r => r.round==data.round)
      if (!round) {
        round = { round: data.round, bots: [] }
        this.rounds[data.round-1] = round
      }
      round.bots[data.botIndex-1] = data.bot
    },
    roundResetTurn(data: RoundResetTurnPayload) {
      // remove all rounds > the given round
      remove(this.rounds, r => r.round > data.round)
      const round = this.rounds.find(r => r.round==data.round)
      if (round) {
        // remove bot persistence from current and subsequent bots
        round.bots = round.bots.slice(0, data.botIndex-1)
      }
    },
    endGame() {
      this.setup.civilizations = {
        numberPlayers: 2,
        numberHumanPlayers: 1,
        playerCivilization: [],
        botCivilization: []
      }
      this.rounds = []
      this.scoring = undefined
    },
    resetGameRounds() {
      this.rounds = []
      this.scoring = undefined
    },
    zoomFontSize(baseFontSize: number) {
      this.baseFontSize = baseFontSize
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
  scoring?: ScoringPersistence
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  expansions: Expansion[]
  civilizations: CivilizationSetup
}
export interface CivilizationSetup {
  numberPlayers: number
  numberHumanPlayers: number
  playerCivilization: CivilizationName[]
  botCivilization: CivilizationName[]
}
export interface Round {
  round: number
  bots: BotPersistence[]
}
export interface BotPersistence {
  civilization: CivilizationName
  cardDeck: CardDeckPersistence
  gold: number
  culturalPolicies: number
  actions: BotCardActionPersistence[]
  cardsDrawn: CardName[]
  cardsDrawnForRound: number
}
export interface BotCardActionPersistence {
  cardNumber: number
  action: Action
  goldCost: number
  actionOptions: Action[]
  completed: boolean
  skipped: boolean
  gold: number
}
export interface CardDeckPersistence {
  drawPile: CardName[]
  discardPile: CardName[]
  openCards: CardName[]
  nexusCards: CardName[]
}
export interface ScoringPersistence {
  knowledgeCardCount: number[]
  wonderCardCount: number[]
  culturalPolicyCountPlayer: number[]
  provinceCount: number[]
  monsterCountPlayer: number[]
}

export interface RoundBotPayload {
  round: number
  botIndex: number
  bot: BotPersistence
}
export interface RoundResetTurnPayload {
  round: number
  botIndex: number
}
