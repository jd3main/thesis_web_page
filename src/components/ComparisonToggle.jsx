import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Toggle from "./Toggle";


function ComparisonToggle({ disabledSrc, enabledSrc, disabledLabel="Disabled", enabledLabel="Enabled", style={}}) {
  
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const refDisabledImage = useRef(null);
  const refContainer = useRef(null);

  return (
    <div ref={refContainer} style={Object.assign({}, {
          width: '100%',
          maxWidth: '720px',
          backgroundColor: 'lightgrey',
          position: 'relative',
        },
        style)
      }>
      
      <ToggleContainer>
        <div style={{display: 'inline-block', margin: 'auto 0'}}>
          <Toggle
            onChanged={setToggleEnabled}
            disabledBackgroundColor='black'
            width='0.6in'>
          </Toggle>
        </div>
        <Label>{toggleEnabled ? enabledLabel : disabledLabel}</Label>
      </ToggleContainer>

      <div style={{
          position: 'absolute',
          width: '100%',
          zIndex: 2,
          visibility: toggleEnabled ? "visible" : "hidden",
        }}>
        <CompImage src={enabledSrc} $zIndex={2}/>
      </div>

      <div style={{
          position: 'static', /* intended for occupying space */
          width: '100%',
          zIndex: 1,
        }}>
        <CompImage ref={refDisabledImage} src={disabledSrc}/>
      </div>
    </div>
  );
}


const CompImage = styled.img`
  draggable: false;
  width: 100%;
  z-index: ${(props) => props.$zIndex || 1};
`


const Label = styled.div`
  display: inline-block;
  margin: auto 1em;
  padding: 0;
  font-size: 1.2em;
  font-weight: bold;
`

const ToggleContainer = styled.div`
  margin: auto;
  padding: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;

`

export default ComparisonToggle;