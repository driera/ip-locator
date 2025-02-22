import path from "path";

function escapeFileName(str) {
  return `svg-${path.basename(str, ".svg")}`
    .split(/\W+/)
    .map((x) => `${x.charAt(0).toUpperCase()}${x.slice(1)}`)
    .join("");
}

const transform = (src, filePath) => {
  if (path.extname(filePath) !== ".svg") {
    return src;
  }

  const name = escapeFileName(filePath);
  return {
    code: `
const React = require('react');
module.exports = {
        __esModule: true,
        default: ${name},
        ReactComponent: React.forwardRef(function Svg${name}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${name}
            })
          };
        }),
      };`
  };
};

export default {
  process: transform
};
