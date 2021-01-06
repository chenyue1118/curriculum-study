// import _ from 'lodash'
// import numRef from './ref.json'
//
// export function numToWord(num) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.num === num ? ref.word : accum;
//   }, '')
// }
//
// export funtion wordToNum(word) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.word === word && word.toLowerCase() ? ref.num : accum;
//   }, -1)
// }

if (process.env.NODE_ENV !== 'production') {
  console.log('looks like we are in development mode!');
}


function getComponent() {
  return import('lodash')
    .then(({ default: _}) => {
      const element = document.createElement('div');
      element.innerHTML = _.join(['Hello', 'webpack'], '');

      return element;
    })
    .catch(() => 'An error occurred while loading the component')
}

getComponent().then((component) => {
  document.body.appendChild(component);
})
