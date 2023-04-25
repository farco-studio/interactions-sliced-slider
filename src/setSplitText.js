import SplitTextJS from "split-text-js";

const setSplitText = (item) => {
  const splitText = new SplitTextJS(item, {
    type: "lines",
  });
};

export { setSplitText };