import Goal from '@/components/Goal'
import { shallowMount } from '@vue/test-utils'

describe('Goal.vue', () => {
  const wrapper = shallowMount(Goal)

  it('should render correct contents', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
