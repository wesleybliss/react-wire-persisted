const path = require('path')

const root = (...dirs) => path.resolve(__dirname, '..', ...dirs)

module.exports = {
    root,
    src: (...dirs) => root('src', ...dirs),
    lib: (...dirs) => root('lib', ...dirs),
    demo: (...dirs) => root('demo', ...dirs),
}
