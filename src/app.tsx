import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BaseComponent from './components';

const App = () => {
  console.log(document.querySelector('#app'))
  return (
    <div className='wrapper'>
      <BaseComponent />
    </div>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'));
