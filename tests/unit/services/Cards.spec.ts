import Cards from '@/services/Cards'
import CardName from '@/services/enum/CardName'
import CivilizationName from '@/services/enum/CivilizationName'
import Expansion from '@/services/enum/Expansion'
import Module from '@/services/enum/Module'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { expect } from 'chai'

describe('Cards', () => {
  it('get', () => {
    const card = Cards.get(CardName.ADVANCED_EXPLORERS_CONQUER)

    expect(card).not.undefined
    expect(card?.name).to.eq(CardName.ADVANCED_EXPLORERS_CONQUER)
  })

  it('getStandard', () => {
    expect(Cards.getStandard([], []).length).eq(16)
    expect(Cards.getStandard([], [Module.HEROES]).length).eq(17)
    expect(Cards.getStandard([Expansion.AFRICAN_EMPIRES], []).length).eq(23)
    expect(Cards.getStandard([Expansion.AFRICAN_EMPIRES], [Module.HEROES]).length).eq(24)
  })

  it('getAdvanced', () => {
    expect(Cards.getAdvanced([], []).length).eq(7)
    expect(Cards.getAdvanced([Expansion.AFRICAN_EMPIRES], []).length).eq(8)
  })

  it('getCivilization', () => {
    getAllEnumValues(CivilizationName).forEach(civilizationName => {
      expect(Cards.getCivilization(civilizationName), civilizationName).not.undefined
    })
  })
})
