import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';



function Toggle({ onChanged,
  width='0.6in',
  height='0.3in',
  margin='0.02in',
  disabledBackgroundColor='grey',
  enabledBackgroundColor='#459E53',
  buttonBackgroundColor='white'
 }) {
  
  const [toggleEnabled, setToggleEnabled] = useState(false);

  useEffect(() => {
    onChanged(toggleEnabled);
  }, [toggleEnabled])

  const handleClick = () => {
    console.log('click');
    setToggleEnabled(!toggleEnabled);
  }

  console.log(`width = ${width}`)
  console.log(`height = ${height}`)
  console.log(`margin = ${margin}`)
  console.log(`toggleEnabled = ${toggleEnabled}`)

  let buttonRadius = `calc(${height} - ${margin} * 2)`

  return (
    <div style={{
        width: width,
        height: height,
        backgroundColor: (toggleEnabled ? enabledBackgroundColor : disabledBackgroundColor),
        borderRadius: `calc(${height} / 2)`,
        position: 'relative',
      }}
      onClick={handleClick}>
      <div style={{
          width: buttonRadius,
          height: buttonRadius,
          position: 'absolute',
          borderRadius: buttonRadius,
          backgroundColor: buttonBackgroundColor,
          left: (toggleEnabled ? `calc(${width} - ${buttonRadius} - ${margin})` : margin),
          top: `calc(${margin})`,
          transition: 'left 0.2s',
        }}
        >
      </div>
    </div>
  );
}



export default Toggle;