import Changelog from '@/components/Changelog'
import { shallowMount } from '@vue/test-utils'

describe('Changelog.vue', () => {
  const wrapper = shallowMount(Changelog)

  it('should render correct contents', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
