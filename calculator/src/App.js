/*eslint-disable no-eval */
import React, { useState } from 'react';
import './App.css';
import Button from './components/button';

function App() {
  const [display, setDisplay] = useState('');

function buttons_numbers(e) {
  console.log(e.target.value);
  e.persist();
  setDisplay(() => display + e.target.value);
}

  
function buttons_value(e) {
  console.log(e.target.value);
  e.persist();
  setDisplay(() => display + e.target.value);
}

function clear_display(e) {
  setDisplay('')
}

function delete_lst_digit(e) {
  e.persist();
  let y = display.slice(0, -1)
  console.log(`display: ${display}, display lenght: ${display.length}, display slice: ${display.slice(0, - 1)}`)
  setDisplay(y);
}

function equalsTo() {
  let m = eval(display);
  setDisplay(m);
}


return (
    <div className="App">
      <div className="label-div">
        <p id="display">{display}</p>
      </div>
      
      <Button btn_label="(" btn_function={buttons_value}/>
      <Button btn_label="delete" btn_function={delete_lst_digit}/>
      <Button btn_label=")" btn_function={buttons_value}/>
      <Button btn_label="C" btn_function={clear_display}/>

      <Button btn_label="1" btn_function={buttons_numbers}/>
      <Button btn_label="2" btn_function={buttons_numbers}/>
      <Button btn_label="3" btn_function={buttons_numbers}/>
      <Button btn_label="+" btn_function={buttons_value}/>

      <Button btn_label="4" btn_function={buttons_numbers}/>
      <Button btn_label="5" btn_function={buttons_numbers}/>
      <Button btn_label="6" btn_function={buttons_numbers}/>
      <Button btn_label="-" btn_function={buttons_value}/>

      <Button btn_label="7" btn_function={buttons_numbers}/>
      <Button btn_label="8" btn_function={buttons_numbers}/>
      <Button btn_label="9" btn_function={buttons_numbers}/>
      <Button btn_label="*" btn_function={buttons_value}/>

      <Button btn_label="." btn_function={buttons_value}/>
      <Button btn_label="0" btn_function={buttons_numbers}/>
      <Button btn_label="=" btn_function={equalsTo}/>
      <Button btn_label="/" btn_function={buttons_value}/>

    </div>
  );
}

export default App;