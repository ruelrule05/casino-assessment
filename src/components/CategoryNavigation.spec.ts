import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CategoryNavigation from "@/components/CategoryNavigation.vue";

describe('CategoryNavigation.vue', () => {
  const mockCategories = [
    { id: 'top', name: 'Top Games' },
    { id: 'slots', name: 'Slots' },
    { id: 'poker', name: 'Poker' },
    { id: 'new', name: 'New Games' },
  ];
  const mockActiveCategory = 'slots';

  if('renders the correct number of category buttons', () => {
    const wrapper = mount(CategoryNavigation, {
      props: {
        categories: mockCategories,
        activeCategory: mockActiveCategory,
      }
    })

    const buttons = wrapper.findAll('button');

    expect(buttons.length).toBe(mockCategories.length);
    expect(buttons[1].text()).toBe('Slots')
  })

    it('applies the "active" class to the currently active category button', () => {
      const wrapper = mount(CategoryNavigation, {
        props: {
          categories: mockCategories,
          activeCategory: mockActiveCategory,
        }
      })

      const activeButton = wrapper.find('button.active');

      expect(activeButton.exists()).toBe(true);
      expect(activeButton.text()).toBe('Slots');
    })

  it('emits a "category-selected" event with the category name when a button is clicked', async () => {
    const wrapper = mount(CategoryNavigation, {
      props: {
        categories: mockCategories,
        activeCategory: mockActiveCategory,
      }
    })

    const pokerButton = wrapper.findAll('button')[2]

    await pokerButton.trigger('click')

    const emittedEvents = wrapper.emitted()

    expect(emittedEvents).toHaveProperty('categoryChanged')

    expect(emittedEvents['categoryChanged'][0][0]).toEqual('poker')
  })
})
