<template>
  <div class="vuemik">
    <slot :handleSubmit="handleSubmit" :errors="{...computedErrors}"></slot>
  </div>
</template>

<script>
import { isInput, isCheckbox, observerToJson } from "./helper";

export default {
  name: "Vuemik",
  props: {
    onSubmit: { type: Function, required: true },
    initialValues: { type: Object, required: true },
    validationSchema: { type: Object, required: false },
  },
  data() {
    return { values: observerToJson(this.initialValues), errors: {} };
  },

  provide() {
    return {
      vuemik: {
        values: this.values,
        change: this.handleChange,
      },
    };
  },
  computed: {
    computedErrors() {
      return this.$data.errors;
    },
  },
  methods: {
    eventOrValue(e) {
      if (!(e instanceof Event)) {
        throw new Error("Instance of Event expected");
      }

      const { target } = e;

      if (isInput(target)) {
        return isCheckbox(target) ? target.checked : target.value;
      }

      return target.value;
    },
    handleChange(e) {
      this.setValues({ [e.target.name]: this.eventOrValue(e) });
    },
    setValues(values) {
      Object.entries(values).forEach(([key, val]) => {
        this.$data.values[key] = val;
      });
    },

    handleAddErros(path, errors) {
      this.$data.errors = { [path]: errors };
    },
    handleResetErrors() {
      this.$data.errors = {};
    },
    handleSubmit() {
      if (this.validationSchema) {
        this.validationSchema
          .validate(this.values)
          .then((validatedObject) => {
            this.onSubmit(observerToJson(validatedObject));
            this.handleResetErrors();
          })
          .catch((error) => {
            this.handleAddErros(error.path, error.errors);
          });
      } else this.onSubmit(observerToJson(this.values));
    },
  },
};
</script>