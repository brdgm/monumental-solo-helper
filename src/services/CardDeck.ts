import { shuffle, remove, random } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import toCardNames from '@/util/toCardNames'
import toCards from '@/util/toCards'
import Expansion from './enum/Expansion'
import Module from './enum/Module'
import { ref } from 'vue'

export default class CardDeck {

  private _drawPile
  private _discardPile
  private _openCards
  private _nexusCards

  private constructor(drawPile : Card[], discardPile : Card[], openCards: Card[], nexusCards: Card[]) {
    this._drawPile = ref(drawPile)
    this._discardPile = ref(discardPile)
    this._openCards = ref(openCards)
    this._nexusCards = ref(nexusCards)
  }

  public get drawPile() : readonly Card[] {
    return this._drawPile.value
  }

  public get discardPile() : readonly Card[] {
    return this._discardPile.value
  }

  public get openCards() : readonly Card[] {
    return this._openCards.value
  }

  public get nexusCards() : readonly Card[] {
    return this._nexusCards.value
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      drawPile: toCardNames(this._drawPile.value),
      discardPile: toCardNames(this._discardPile.value),
      openCards: toCardNames(this._openCards.value),
      nexusCards: toCardNames(this._nexusCards.value)
    }
  }

  /**
   * Shuffles discard and remaining draw pile into a new draw pile.
   */
  public shuffleDiscardDrawPile() : void {
    this._drawPile.value.push(...this._discardPile.value)
    this._discardPile.value = []
    this._drawPile.value = shuffle(this._drawPile.value)
  }

  /**
   * Draw a card and add it to open cards
   * @returns Drawn card
   */
  public draw() : Card {
    // shuffle draw pile if empty (should normally never happen)
    if (this._drawPile.value.length == 0) {
      this.shuffleDiscardDrawPile()
      if (this._drawPile.value.length == 0) {
        throw new Error('Discard and draw pile is empty.')
      }
    }

    // take 1st card from draw pile and add to open cards
    const card = this._drawPile.value.shift() as Card
    this._openCards.value.push(card)

    return card
  }

  /**
   * Discard all open cards to discard pile.
   */
  public discardAll() : void {
    this._discardPile.value.push(...this._openCards.value)
    this._openCards.value = []
  }

  /**
   * Discards the given card
   * @param card Card
   */
  public discardCard(card: Card) : void {
    this._discardPile.value.push(card)
    remove(this._openCards.value, c => c.name == card.name)
  }

  /**
   * Move the given card to Nexus
   * @param card Card
   */
  public moveToNexus(card: Card) : void {
    this._nexusCards.value.push(card)
    remove(this._openCards.value, c => c.name == card.name)
  }

  /**
   * Removes a card from the game.
   * @param card Card
   */
  public removeCard(card: Card) : void {
    remove(this._drawPile.value, c => c.name == card.name)
    remove(this._discardPile.value, c => c.name == card.name)
    remove(this._openCards.value, c => c.name == card.name)
  }

  /**
   * Creates a shuffled new card deck with random advanced cards.
   */
  public static new(numAdvancedCards: number,
      expansions: Expansion[], modules: Module[]) : CardDeck {
    // prepare draw pile
    const drawPile : Card[] = []
    drawPile.push(...Cards.getStandard(expansions, modules))
    drawPile.push(...CardDeck.pickRandomAdvancedCards(numAdvancedCards, expansions, modules))
    const cardDeck = new CardDeck(drawPile, [], [], [])
    cardDeck.shuffleDiscardDrawPile()
    return cardDeck
  }

  /**
   * Re-creates a card date from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      toCards(persistence.drawPile),
      toCards(persistence.discardPile),
      toCards(persistence.openCards),
      toCards(persistence.nexusCards)
    )
  }

  /**
   * Randomly picks the given number of advanced cards.
   */
  private static pickRandomAdvancedCards(numAdvancedCards: number,
      expansions: Expansion[], modules: Module[]) : Card[] {
    const advancedCards : Card[] = []

    if (numAdvancedCards > 0) {
      const allAdvancedCards = Cards.getAdvanced(expansions, modules)
      if (numAdvancedCards >= allAdvancedCards.length) {
        advancedCards.push(...allAdvancedCards)
      }
      else {
        while (advancedCards.length < numAdvancedCards) {
          const randomIndex = random(allAdvancedCards.length - 1)
          const advancedCard = allAdvancedCards[randomIndex]
          if (!advancedCards.includes(advancedCard)) {
            advancedCards.push(advancedCard)
          }
        }
      }
    }

    return advancedCards
  }

}
