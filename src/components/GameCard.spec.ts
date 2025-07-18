import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameCard from './GameCard.vue';
import type { Game } from '@/types/Game';

describe('GameCard.vue', () => {
  const mockGame: Game = {
    id: 'NETHEWISHMASTER',
    name: 'The Wish Master',
    image: 'https://stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
    categories: ['top', 'slots', 'new'],
  };

  it('renders the game name and image correctly', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        showRibbon: false,
        ribbonText: 'New',
      },
    });

    const nameElement = wrapper.find('.game-name');
    expect(nameElement.text()).toBe('The Wish Master');

    const imageElement = wrapper.find('img');
    expect(imageElement.attributes('src')).toBe(mockGame.image);
  });

  it('displays the ribbon when showNewRibbon is true', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        showNewRibbon: true,
        ribbonText: 'New',
      },
    });

    const ribbon = wrapper.find('.ribbon');

    expect(ribbon.exists()).toBe(true);
    expect(ribbon.text()).toBe('New');
  });

  it('does not display the ribbon when showRibbon is false', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        showRibbon: false,
        ribbonText: 'New',
      },
    });

    const ribbon = wrapper.find('.ribbon');
    expect(ribbon.exists()).toBe(false);
  });

  it('displays both new and top ribbons when both props are true', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        showNewRibbon: true,
        showTopRibbon: true,
      },
    });

    const newRibbon = wrapper.find('.new-ribbon');
    const topRibbon = wrapper.find('.top-ribbon');

    expect(newRibbon.exists()).toBe(true);
    expect(topRibbon.exists()).toBe(true);
    expect(newRibbon.text()).toBe('New');
    expect(topRibbon.text()).toBe('Top');
  });

  it('displays only new ribbon when only showNewRibbon is true', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        showNewRibbon: true,
        showTopRibbon: false,
      },
    });

    const newRibbon = wrapper.find('.new-ribbon');
    const topRibbon = wrapper.find('.top-ribbon');

    expect(newRibbon.exists()).toBe(true);
    expect(topRibbon.exists()).toBe(false);
  });
});
