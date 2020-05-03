import Header from '@/components/Header'
import { shallowMount } from '@vue/test-utils'

describe('Header.vue', () => {
  const wrapper = shallowMount(Header)

  it('should render correct contents', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
