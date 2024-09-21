import Action from './enum/Action'
import CardName from './enum/CardName'
import CivilizationType from './enum/CivilizationType'
import CivilizationName from './enum/CivilizationName'
import Expansion from './enum/Expansion'
import Module from './enum/Module'

export default interface Card {
  name: CardName
  actions: CardAction[],
  advanced?: boolean,
  civilization?: CivilizationName
  expansion?: Expansion
  module?: Module
}

export interface CardAction {
  action: Action
  gold?: number
  ifType?: CivilizationType,
  actionOptions?: Action[]
}
