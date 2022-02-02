import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BaseComponent from './components';

const App = () => {

  return (
    <div className='wrapper' style={{display: 'flex', justifyContent: 'center'}}>
      <BaseComponent />
    </div>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'));
