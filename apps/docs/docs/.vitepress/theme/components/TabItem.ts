import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'TabItem',
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    default: {
      type: Boolean,
      required: false,
    },
  },
  setup(_, {slots}) {
    return () => h('div', {class: 'platform-tab-item'}, slots.default?.());
  },
});
