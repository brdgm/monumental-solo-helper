import CardName from './enum/CardName'
import Card from './Card'
import CivilizationType from './enum/CivilizationType'
import Action from './enum/Action'
import CivilizationName from './enum/CivilizationName'
import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Expansion from './enum/Expansion'
import Module from './enum/Module'

const cards : Card[] = [
  /* Standard Action Cards */
  { name: CardName.CONQUER_IF_ARCHITECTURAL, actions: [
    { action: Action.CONQUER_1_ADJACENT_LOWEST_COST },
    { action: Action.CONQUER_1_ADJACENT_LOWEST_COST, gold: 2 },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST, ifType: CivilizationType.ARCHITECTURAL },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST, ifType: CivilizationType.ARCHITECTURAL },
    { action: Action.BUILDING_TAKE_LOWEST_COST, ifType: CivilizationType.ARCHITECTURAL },
  ]},
  { name: CardName.KNOWLEDGE_IF_AGGRESSIVE, actions: [
    { action: Action.KNOWLEDGE_TAKE_HIGHEST_COST },
    { action: Action.KNOWLEDGE_TAKE_HIGHEST_COST, gold: 2 },
    { action: Action.CONQUER_1_ADJACENT_LOWEST_COST, ifType: CivilizationType.AGGRESSIVE },
    { action: Action.CONQUER_1_ADJACENT_HIGHEST_COST, ifType: CivilizationType.AGGRESSIVE },
  ]},
  { name: CardName.CULTURAL_POLICY_IF_TECHNOLOGICAL, actions: [
    { action: Action.DEVELOP_1_CULTURAL_POLICY },
    { action: Action.DEVELOP_1_CULTURAL_POLICY, gold: 3 },
    { action: Action.KNOWLEDGE_TAKE_LOWEST_COST, ifType: CivilizationType.TECHNOLOGICAL },
    { action: Action.KNOWLEDGE_TAKE_HIGHEST_COST, ifType: CivilizationType.TECHNOLOGICAL },
  ]},
  { name: CardName.GOLD_IF_TECHNOLOGICAL, actions: [
    { action: Action.GAIN_3_GOLD },
    { action: Action.KNOWLEDGE_TAKE_LOWEST_COST, ifType: CivilizationType.TECHNOLOGICAL },
    { action: Action.KNOWLEDGE_TAKE_HIGHEST_COST, ifType: CivilizationType.TECHNOLOGICAL },
  ]},
  { name: CardName.CONQUER_IF_ECONOMIC, actions: [
    { action: Action.CONQUER_1_ADJACENT_LOWEST_COST },
    { action: Action.CONQUER_1_ADJACENT_LOWEST_COST, gold: 2 },
    { action: Action.EXPLORER_BOTH_MOVE_2_SPACE, ifType: CivilizationType.ECONOMIC },
  ]},
  { name: CardName.EXPLORERS_IF_AGGRESSIVE, actions: [
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE },
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.CONQUER_3_ADJACENT_HIGHEST_COST, ifType: CivilizationType.AGGRESSIVE },
    { action: Action.SHUFFLE_CARDS, ifType: CivilizationType.AGGRESSIVE },
  ]},
  { name: CardName.WONDER_IF_ECONOMIC, actions: [
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.EXPLORER_BOTH_MOVE_2_SPACE, ifType: CivilizationType.ECONOMIC },
  ]},
  { name: CardName.KNOWLEDGE_IF_ARCHITECTURAL, actions: [
    { action: Action.KNOWLEDGE_TAKE_HIGHEST_COST },
    { action: Action.KNOWLEDGE_TAKE_HIGHEST_COST, gold: 2 },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST, ifType: CivilizationType.ARCHITECTURAL },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST, ifType: CivilizationType.ARCHITECTURAL },
    { action: Action.BUILDING_TAKE_LOWEST_COST, ifType: CivilizationType.ARCHITECTURAL },
  ]},
  { name: CardName.CULTURAL_POLICY_IF_AGGRESSIVE, actions: [
    { action: Action.DEVELOP_1_CULTURAL_POLICY },
    { action: Action.DEVELOP_1_CULTURAL_POLICY, gold: 3 },
    { action: Action.CONQUER_1_ADJACENT_LOWEST_COST, ifType: CivilizationType.AGGRESSIVE },
    { action: Action.CONQUER_1_ADJACENT_HIGHEST_COST, ifType: CivilizationType.AGGRESSIVE },
  ]},
  { name: CardName.EXPLORERS_IF_CULTURAL, actions: [
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE },
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.DEVELOP_1_CULTURAL_POLICY, ifType: CivilizationType.CULTURAL },
    { action: Action.DEVELOP_1_CULTURAL_POLICY, ifType: CivilizationType.CULTURAL },
    { action: Action.SHUFFLE_CARDS, ifType: CivilizationType.CULTURAL },
  ]},
  { name: CardName.EXPLORERS_IF_ARCHITECTURAL, actions: [
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE },
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST, ifType: CivilizationType.ARCHITECTURAL },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST, ifType: CivilizationType.ARCHITECTURAL },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST, ifType: CivilizationType.ARCHITECTURAL },
    { action: Action.BUILDING_TAKE_HIGHTEST_COST, ifType: CivilizationType.ARCHITECTURAL },
    { action: Action.SHUFFLE_CARDS, ifType: CivilizationType.ARCHITECTURAL },
  ]},
  { name: CardName.GOLD_IF_CULTURAL, actions: [
    { action: Action.GAIN_3_GOLD },
    { action: Action.DEVELOP_1_CULTURAL_POLICY_2_GOLD_PER_POLICY, ifType: CivilizationType.CULTURAL },
  ]},
  { name: CardName.EXPLORERS_IF_TECHNOLOGICAL, actions: [
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE },
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.KNOWLEDGE_TAKE_ALL, ifType: CivilizationType.TECHNOLOGICAL },
    { action: Action.SHUFFLE_CARDS, ifType: CivilizationType.TECHNOLOGICAL },
  ]},
  { name: CardName.EXPLORERS_IF_ECONOMIC, actions: [
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE },
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.EXPLORER_BOTH_MOVE_3_SPACE, ifType: CivilizationType.ECONOMIC },
    { action: Action.SHUFFLE_CARDS, ifType: CivilizationType.ECONOMIC },
  ]},
  { name: CardName.WONDER_IF_CULTURAL, actions: [
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.DEVELOP_1_CULTURAL_POLICY_2_GOLD_PER_POLICY, ifType: CivilizationType.CULTURAL },
  ]},
  { name: CardName.TRADE_TRACK_IF_ARCHITECTURAL, expansion:Expansion.AFRICAN_EMPIRES, actions: [
    { action: Action.TRADE_TRACK_1_STEP },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.DRAW_RESERVE_CARD_2_GAIN_WONDERS, ifType: CivilizationType.ARCHITECTURAL },
  ]},
  { name: CardName.TRADE_TRACK_IF_CULTURAL, expansion:Expansion.AFRICAN_EMPIRES, actions: [
    { action: Action.TRADE_TRACK_1_STEP },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.GAIN_2_GOLD_PER_POLICY, ifType: CivilizationType.CULTURAL },
  ]},
  { name: CardName.TRADE_TRACK_IF_ECONOMIC, expansion:Expansion.AFRICAN_EMPIRES, actions: [
    { action: Action.TRADE_TRACK_1_STEP },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.TRADE_TRACK_2_STEP, ifType: CivilizationType.ECONOMIC },
  ]},
  { name: CardName.TRADE_TRACK_IF_TECHNOLOGICAL, expansion:Expansion.AFRICAN_EMPIRES, actions: [
    { action: Action.TRADE_TRACK_1_STEP },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.DRAW_RESERVE_CARD_3_GAIN_KNOWLEDGE, ifType: CivilizationType.TECHNOLOGICAL },
  ]},
  { name: CardName.TRADE_TRACK_IF_AGGRESSIVE, expansion:Expansion.AFRICAN_EMPIRES, actions: [
    { action: Action.TRADE_TRACK_1_STEP },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.TRADE_TRACK_1_STEP, gold: 1 },
    { action: Action.OPPONENTS_UNREST_DECK_DISCARD, ifType: CivilizationType.AGGRESSIVE },
  ]},
  { name: CardName.TRADING_POST_1, expansion:Expansion.AFRICAN_EMPIRES, actions: [
    { action: Action.BUILD_TRADING_POST_REMOVE_CARD }
  ]},
  { name: CardName.TRADING_POST_2, expansion:Expansion.AFRICAN_EMPIRES, actions: [
    { action: Action.BUILD_TRADING_POST_REMOVE_CARD }
  ]},
  { name: CardName.TAKE_HERO, module:Module.HEROES, actions: [
    { action: Action.TAKE_RETURN_HERO },
    { action: Action.DRAW_CARD }
  ]},
  /* Advanced Action Cards */
  { name: CardName.ADVANCED_EXPLORERS_KNOWLEDGE, advanced: true, actions: [
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE },
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.KNOWLEDGE_TAKE_LOWEST_COST },
    { action: Action.KNOWLEDGE_TAKE_HIGHEST_COST },
  ]},
  { name: CardName.ADVANCED_EXPLORERS_CULTURAL_POLICY, advanced: true, actions: [
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE },
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.DEVELOP_1_CULTURAL_POLICY_2_GOLD_PER_POLICY },
  ]},
  { name: CardName.ADVANCED_EXPLORERS_WONDER, advanced: true, actions: [
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE },
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST },
    { action: Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
  ]},
  { name: CardName.ADVANCED_EXPLORERS_CONQUER, advanced: true, actions: [
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE },
    { action: Action.EXPLORER_BOTH_MOVE_1_SPACE, gold: 2 },
    { action: Action.BUILDING_TAKE_LOWEST_COST },
    { action: Action.CONQUER_1_ADJACENT_LOWEST_COST },
    { action: Action.CONQUER_1_ADJACENT_HIGHEST_COST },
  ]},
  { name: CardName.ADVANCED_FEWEST_WONDERS, advanced: true, actions: [
    { action: Action.FEWEST_WONDERS_WONDER_COMPLETE_ACQUIRE_GAIN_BUILDING_LOSTEST_COST },
    { action: Action.DRAW_CARD },
  ]},
  { name: CardName.ADVANCED_FEWEST_CULTURAL_POLICIES, advanced: true, actions: [
    { action: Action.FEWEST_CULTURAL_POLICIES_DEVELOP_1_CULTURAL_POLICY },
    { action: Action.DRAW_CARD },
  ]},
  { name: CardName.ADVANCED_LAST_TRADE_TRACK, advanced: true, expansion:Expansion.AFRICAN_EMPIRES, actions: [
    { action: Action.TRADE_TRACK_LAST_TRADE_TRACK_2_STEP },
    { action: Action.DRAW_CARD },
  ]},
  { name: CardName.ADVANCED_FEWEST_PROVINCES, advanced: true, actions: [
    { action: Action.FEWEST_PROVINCES_CONQUER_1_ADJACENT_LOWEST_COST },
    { action: Action.DRAW_CARD },
  ]},
  /* Civilization Cards */
  { name: CardName.MULTI_AUTOMA, actions: []},
  { name: CardName.AMAZON_CIVILIZATION, civilization: CivilizationName.AMAZONS, actions: [
    { action: Action.AMAZON_GAIN_MOUNT_2_HORSES },
    { action: Action.DRAW_CARD },
  ]},
  { name: CardName.ATLANTIS_CIVILIZATION, civilization: CivilizationName.ATLANTIS, actions: [
    { action: Action.ATLANTIS_NEXUS_PLACE_NEXT_USE_ALL },
  ]},
  { name: CardName.AZTECS_CIVILIZATION, civilization: CivilizationName.AZTECS, actions: [
    { action: Action.AZTECS_SACRIFICE_GET_GOLD },
    { action: Action.DRAW_CARD },
  ]},
  { name: CardName.CHINA_CIVILIZATION, civilization: CivilizationName.CHINA, actions: [
    { action: Action.CHINA_DRAW_UNTIL_TECHNOLOGICAL_ACTION },
  ]},
  { name: CardName.DENMARK_CIVILIZATION, civilization: CivilizationName.DENMARK, actions: [
    { action: Action.DENMARK_COASTAL_PROVINCES_GOLD },
    { action: Action.DRAW_CARD },
  ]},
  { name: CardName.EGYPT_CIVILIZATION, civilization: CivilizationName.EGYPT, actions: [
    { action: Action.EGYPT_DRAW_CARD_GET_TWICE_ACTION_NON_SPECIAL },
  ]},
  { name: CardName.GREECE_CIVILIZATION, civilization: CivilizationName.GREECE, actions: [
    { action: Action.GREECE_DRAW_GET_ACTION_SPECIAL },
  ]},
  { name: CardName.JAPAN_CIVILIZATION, civilization: CivilizationName.JAPAN, actions: [
    { action: Action.CHOOSE_ACTION, actionOptions: [Action.CONQUER_1_ADJACENT_LOWEST_COST,Action.DEVELOP_1_CULTURAL_POLICY,Action.DRAW_CARD] },
  ]},
  { name: CardName.MUGHALS_CIVILIZATION, civilization: CivilizationName.MUGHALS, actions: [
    { action: Action.MUGHALS_DRAW_NEXT_REMOVE_NON_ECONOMIC },
    { action: Action.DRAW_CARD },
  ]},
  { name: CardName.MALIANS_CIVILIZATION, civilization: CivilizationName.MALIANS, actions: [
    { action: Action.GAIN_2_GOLD },
    { action: Action.TRADE_TRACK_1_STEP },
    { action: Action.DRAW_CARD },
  ]},
  { name: CardName.ZULU_CIVILIZATION, civilization: CivilizationName.ZULU, actions: [
    { action: Action.OPPONENTS_UNREST_DECK_DISCARD },
    { action: Action.DRAW_CARD },
  ]},
  { name: CardName.AKSUMITES_CIVILIZATION, civilization: CivilizationName.AKSUMITES, actions: [
    { action: Action.DRAW_RESERVE_CARD_1_GAIN },
    { action: Action.DRAW_CARD },
  ]},
]

const cardsMap = new Map<CardName,Card>()
cards.forEach(card => cardsMap.set(card.name, card))

export default {

  /**
   * Get card by name
   * @param name Name
   * @returns Card
   */
  get(name: CardName) : Card {
    return findMandatory(cardsMap, name)
  },

  /**
   * Get standard action cards
   * @returns cards
   */
  getStandard(expansions: Expansion[], modules: Module[]) : Card[] {
    return cards.filter(card => card.advanced == undefined
      && card.civilization == undefined 
      && matches(card, expansions, modules))
  },

  /**
   * Get standard action cards
   * @returns cards
   */
  getAdvanced(expansions: Expansion[], modules: Module[]) : Card[] {
    return cards.filter(card => card.advanced
      && matches(card,expansions, modules))
  },

  /**
   * Get civilization card
   * @returns card
   */
  getCivilization(civilization: CivilizationName) : Card {
    const card = cards.find(c => c.civilization == civilization)
    if (!card) {
      throw new Error("No civilization card for " + civilization)
    }
    return card
  }

}

function matches(card: Card, expansions: Expansion[], modules: Module[]) {
  return (!card.expansion || expansions.includes(card.expansion))
      && (!card.module || modules.includes(card.module))
}
