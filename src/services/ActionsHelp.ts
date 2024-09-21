import Action from './enum/Action'
import ActionHelp from './enum/ActionHelp'

const mappings = [
  { help: ActionHelp.GAIN_DEVELOPMENT_CARD, actions: [
    Action.BUILDING_TAKE_LOWEST_COST,
    Action.BUILDING_TAKE_HIGHTEST_COST,
    Action.KNOWLEDGE_TAKE_LOWEST_COST,
    Action.KNOWLEDGE_TAKE_HIGHEST_COST,
    Action.KNOWLEDGE_TAKE_ALL,
    Action.DRAW_RESERVE_CARD_3_GAIN_KNOWLEDGE
  ]},
  { help: ActionHelp.BUILD_WONDER, actions: [
    Action.WONDER_COMPLETE_ACQUIRE_LOWEST_COST,
    Action.FEWEST_WONDERS_WONDER_COMPLETE_ACQUIRE_GAIN_BUILDING_LOSTEST_COST,
    Action.DRAW_RESERVE_CARD_2_GAIN_WONDERS
  ]},
  { help: ActionHelp.CONQUER_PROVINCE, actions: [
    Action.CONQUER_1_ADJACENT_LOWEST_COST,
    Action.CONQUER_1_ADJACENT_HIGHEST_COST,
    Action.CONQUER_3_ADJACENT_HIGHEST_COST,
    Action.FEWEST_PROVINCES_CONQUER_1_ADJACENT_LOWEST_COST
  ]},
  { help: ActionHelp.MOVE_EXPLORERS, actions: [
    Action.EXPLORER_BOTH_MOVE_1_SPACE,
    Action.EXPLORER_BOTH_MOVE_2_SPACE,
    Action.EXPLORER_BOTH_MOVE_3_SPACE
  ]},
  { help: ActionHelp.TRADE_TRACK, actions: [
    Action.TRADE_TRACK_1_STEP,
    Action.TRADE_TRACK_2_STEP,
    Action.TRADE_TRACK_LAST_TRADE_TRACK_2_STEP
  ]},
  { help: ActionHelp.HERO, actions: [
    Action.TAKE_RETURN_HERO
  ]}
]

const actionMap = new Map<Action,ActionHelp>()
mappings.forEach(mapping => {
  mapping.actions.forEach(action => actionMap.set(action, mapping.help))
})

export default {

  /**
   * Get action help for action
   * @param action Action
   * @returns Action help
   */
  get(action: Action) : ActionHelp | undefined {
    return actionMap.get(action)
  }

}
