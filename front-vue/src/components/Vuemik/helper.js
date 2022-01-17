const isInput = (elm) => elm.type !== undefined && elm.type !== "textarea";
const isCheckbox = (elm) => elm.type !== undefined && elm.type === "checkbox";

const observerToJson = (obs) => JSON.parse(JSON.stringify(obs));

export { isInput, isCheckbox, observerToJson };