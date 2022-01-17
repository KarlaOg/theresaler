<template>
  <component
    :is="component"
    :name="name"
    @input="vuemik.change"
    :value="vuemik.values[name]"
  >
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: "Field",
  props: {
    component: { type: [Object, String], required: true },
    name: { type: String, required: true },
  },
  inject: ["vuemik"],
  methods: {},
};
</script>