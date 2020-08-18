import React, { useEffect,useCallback } from 'react';
import logo from './logo.svg';
import './App.css';

// gap gap 20  33 gap 56  58 gap 85 ["", "", 20 , 33 ,"", 56 , 58 ,"", 85]
// 4   12 gap  37 gap gap 65 71 gap [ 4 ,  12, "",  37 ,"", "", 65 ,71 ,""]
// 9   gap 26 gap 47  58 gap gap 88 [ 9 ,  "", 26, "", 47 , 58, "", "", 88]

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function getCssFor(content) {
  if(content[0] === "") {
    return "orange"
  }
  if(content[1]) {
    return 'lightgreen'
  }
  return ""
}

function App() {

  function Cell(props) {
    return <div style={{background: `${getCssFor(props.content)}`,height:"70px",width:"70px",border:"2px solid black"}}><input placeholder={props.content[0]} style={{"fontSize" : "35pt",width : "50px",background:"transparent",border:"none"}} onChange={(e) => handleTextChange(e ,props.coord.x,props.coord.y)}/></div>
  }


  const handleKeyPress = useCallback((event) => {
    if (event.keyCode === 13) {
      handleClick();
    }
  }); // Necesita la dependecia search porque pierde el estado

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  });

  useEffect(() => setLine(content.reduce( (ac , row) =>  ac || rowIsLine(row)
  ,false)))
  
  let prevcontent = [ 
    [[8,false], ["",false], [22,false] ,    ["",false] ,["",false], ["",false] , [67,false] ,[72,false], [83,false]],
    [ ["",false] ,  [18,false], ["",false],  [33,false] ,[49,false], ["",false], [61,false] ,[73,false] ,["",false]],
    [ [1,false] ,  [17,false],[ "",false],   [35,false], ["",false] , [50,false], ["",false], ["",false], [85,false]]
  ]

  const text= ''
  const [number,setNumber] = React.useState();
  const [line,setLine] = React.useState(false);
  const [history,setHistory] = React.useState('Historial:');
  const [content,setContent] = React.useState(prevcontent);

  const handleNumber = (e) => {
    setNumber(e.target.value)
  }

  const isChecked = (col) => {
    if(col[0] === '') {
      return true
    }
    return col[1];
  }

  const handleTextChange = (e,x,y) => {
    setContent(content.map( (row,indexX) => {
      return (row.map(
         (col,indexY) => {
           console.log(x,y)
           console.log(indexX,indexY)
          if(x === indexX && y === indexY){return [e.target.value,col[1]];}
          return col;
         }))
      }
  ));
  }

  const rowIsLine = (row) => row.reduce((ac,col) => ac && isChecked(col),true) 

  const handleClick = () => {
    setContent(content.map( row => {
        return (row.map(
           col => {
            if(col[0] === parseInt(number)){return [col[0],true];}
            return col;
           }))
        }
    ));
    setNumber('')
    setHistory(history + number + ', ')
  }


  const showLine = () => {
    if(line) {
      return <h1 style={{color:'green', fontSize:'40pt'}} >LINEA!:)</h1>
    }
  }

  const mapColumnsContent = (row,x) => {
    return row.map((col,index) =>
      <td  key={Math.random()}>
        <Cell content={col} coord={{x,y:index}} />
      </td>);
  }

  const renderRaws = () => {
    return content.map((row, index) =>
      <tbody key={Math.random()}>
      <tr>
          {mapColumnsContent(row,index)}
      </tr>
      </tbody>);
  }
  return (
    <div className="App">
      <h1>Bingo checker!:)</h1>
      <input style={{"marginBottom":"20px"}} placeholder="Que numero salio?" value={number} onChange={handleNumber}/>
      <button onClick={handleClick} >Check</button>
      <h3>{history}</h3>
      <table style={{border:"2px solid black",margin:'auto'}}>
      {renderRaws()}
      </table>
      {showLine()}
    </div>
  );
}

export default App;
