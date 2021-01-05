import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

function component() {
  const element = document.createElement('div');

  // lodash 对于执行这一行是必需的
  // lodash，现在通过一个 script 引入
  element.innerHTML = _.join(['Hello', 'webpack'], '');
  element.classList.add('hello');

  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
