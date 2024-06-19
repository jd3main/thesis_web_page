import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

function clamp(x, a, b) {
  return Math.min(Math.max(x, a), b);
}

// store event handlers in global variable for later removal
let moveHandler = null;
let stopHandler = null;

function ComparisonSlider({ leftSrc, rightSrc, leftText="L", rightText="R", width, lineWidth="2px" }) {
  
  const [ratio, setRatio] = useState(0.5);
  const refLeftImage = useRef(null);
  const refContainer = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const startDrag = (e) => {
    setIsDragging(true);
  }

  const stopDrag = (e) => {
    setIsDragging(false);
  }

  const handleMove = (e) => {
    if (isDragging) {
      const containerRect = refContainer.current.getBoundingClientRect();
      let newRatio = (e.clientX - containerRect.left) / containerRect.width;
      newRatio = clamp(newRatio, 0, 1);
      setRatio(newRatio);
    }
  }

  useEffect(() => {
    if (isDragging) {
      if (moveHandler != null) {
        removeEventListener('mousemove', moveHandler);
      }
      if (stopHandler != null) {
        removeEventListener('mouseup', stopHandler);
      }
      addEventListener('mousemove', handleMove);
      addEventListener('mouseup', stopDrag);
      moveHandler = handleMove;
      stopHandler = stopDrag;
    } else {
      if (moveHandler != null) {
        removeEventListener('mousemove', moveHandler);
        moveHandler = null;
      }
      if (stopHandler != null) {
        removeEventListener('mouseup', stopHandler);
        stopHandler = null;
      }
    }
  }, [isDragging])

  return (
    <div ref={refContainer} style={{
      width: width,
      maxWidth: "720px",
      backgroundColor: 'grey',
      position:'relative',
      height: 'auto',
      margin: 'auto',
      }}>

      <div style={{
          position: 'absolute',
          clipPath: `rect(0px ${ratio*100}% 100% 0px)`,
          width: '100%',
          zIndex: 2,
        }}>
        <CompImage ref={refLeftImage} src={leftSrc}/>
      </div>
      <Slider $ratio={ratio} $lineWidth={lineWidth} $isDragging={isDragging} onMouseDown={startDrag}></Slider>
      <SliderDragger $ratio={ratio} $width="3em" $isDragging={isDragging} onMouseDown={startDrag}>
        <p style={{
          margin: "auto",
          }}>
          &lt; &gt;
        </p>
      </SliderDragger>
      <div style={{
          position: 'static', /* intended for occupying space */
          width: '100%',
          zIndex: 1,
        }}>
        <CompImage src={rightSrc} $zIndex={2}/>
      </div>
      <LeftCompTitle $ratio={ratio}>{leftText}</LeftCompTitle>
      <RightCompTitle $ratio={ratio}>{rightText}</RightCompTitle>
    </div>
  );
}


const Slider = styled.div`
  position: absolute;
  z-index: 2;
  cursor: ew-resize;
  width: ${(props) => props.$lineWidth};
  left: calc(${(props) => props.$ratio*100}% - ${(props) => props.$lineWidth});
  top: 0;
  height: 100%;
  background-color: orange;
  opacity: ${props => props.$isDragging ? 0.5 : 1};

  /* disable text selection */
  user-select: none;
`

const SliderDragger = styled(Slider)`
  width: ${props => props.$width};
  height: ${props => props.$width};
  line-height: ${props => props.$width};
  left: calc(${props => props.$ratio*100}% - ${props => props.$width}/2);
  top: calc(50% - ${props => props.$width}/2);
  background-color: orange;
  color: white;
  border-radius: 100%;
  text-align: center;
  font-size: 0.15in;
  opacity: ${props => props.$isDragging ? 0.5 : 1};
`

const CompImage = styled.img`
  draggable: false;
  width: 100%;
  z-index: ${(props) => props.$zIndex || 1};
`

const CompTitle = styled.div`
  position: absolute;
  color: white;
  font-size: 20px;
  z-index: 3;
  margin: 0.5em;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5em;
`

const LeftCompTitle = styled(CompTitle)`
  left: 0;
  bottom: 0;
  opacity: ${props => clamp(props.$ratio/0.3, 0.0, 1.0)};
`

const RightCompTitle = styled(CompTitle)`
  right: 0;
  bottom: 0;
  opacity: ${props => clamp((1-props.$ratio)/0.3, 0.0, 1.0)};
`


export default ComparisonSlider;