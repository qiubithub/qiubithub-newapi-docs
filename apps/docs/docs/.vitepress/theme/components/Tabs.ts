import {defineComponent, h, ref, type VNode} from 'vue';

function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (Array.isArray(node.children)) {
      return flatten(node.children as VNode[]);
    }

    return [node];
  });
}

function propValue(node: VNode, key: string) {
  const value = node.props?.[key];
  return value == null ? '' : String(value);
}

export default defineComponent({
  name: 'Tabs',
  props: {
    groupId: {
      type: String,
      required: false,
    },
  },
  setup(props, {slots}) {
    const active = ref('');

    return () => {
      const items = flatten((slots.default?.() ?? []) as VNode[]).filter(
        (node) => propValue(node, 'label') && propValue(node, 'value'),
      );

      if (items.length === 0) {
        return h('div', {class: 'platform-tabs'}, slots.default?.());
      }

      const defaultItem = items.find((item) => item.props && 'default' in item.props);
      const firstValue = propValue(defaultItem ?? items[0], 'value');
      const selectedValue = items.some((item) => propValue(item, 'value') === active.value)
        ? active.value
        : firstValue;

      return h('div', {class: 'platform-tabs'}, [
        h(
          'div',
          {class: 'platform-tabs-list', role: 'tablist'},
          items.map((item) => {
            const value = propValue(item, 'value');
            const selected = value === selectedValue;
            const idPrefix = props.groupId ? `tabs-${props.groupId}` : 'tabs';
            const tabId = `${idPrefix}-tab-${value}`;
            const panelId = `${idPrefix}-panel-${value}`;

            return h(
              'button',
              {
                key: value,
                class: ['platform-tabs-trigger', selected ? 'is-active' : ''],
                type: 'button',
                role: 'tab',
                id: tabId,
                'aria-selected': selected ? 'true' : 'false',
                'aria-controls': panelId,
                tabindex: selected ? 0 : -1,
                onClick: () => {
                  active.value = value;
                },
              },
              propValue(item, 'label'),
            );
          }),
        ),
        h(
          'div',
          {class: 'platform-tabs-panels'},
          items.map((item) => {
            const value = propValue(item, 'value');
            const idPrefix = props.groupId ? `tabs-${props.groupId}` : 'tabs';
            return h(
              'div',
              {
                key: value,
                class: 'platform-tab-panel',
                role: 'tabpanel',
                id: `${idPrefix}-panel-${value}`,
                'aria-labelledby': `${idPrefix}-tab-${value}`,
                hidden: value !== selectedValue,
              },
              [item],
            );
          }),
        ),
      ]);
    };
  },
});
