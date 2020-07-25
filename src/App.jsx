import React from 'react';
import logo from './logo.svg';
import './App.css';

// gap gap 20  33 gap 56  58 gap 85 ["", "", 20 , 33 ,"", 56 , 58 ,"", 85]
// 4   12 gap  37 gap gap 65 71 gap [ 4 ,  12, "",  37 ,"", "", 65 ,71 ,""]
// 9   gap 26 gap 47  58 gap gap 88 [ 9 ,  "", 26, "", 47 , 58, "", "", 88]

function getCssFor(content) {
  if(content[0] === "") {
    return "red"
  }
  if(content[1] === 'checked') {
    return 'green'
  }
  return ""
}

function Cell(props) {
  return <div style={{background: `${getCssFor(props.content)}`,height:"70px",width:"70px",border:"2px solid black"}}><span style={{"font-size" : "35pt"}} >{props.content[0]}</span></div>
}

function App() {
  
  let prevcontent = [ 
    [["",''], ["",''], [20,''] , [33,''] ,["",''], [56,''] , [68,''] ,["",''], [85,'']],
    [ [4,''] ,  [12,''], ["",''],  [37,''] ,["",''], ["",''], [65,''] ,[71,''] ,["",'']],
    [ [9,''] ,  ["",''],[ 26,''], ["",''], [47,''] , [58,''], ["",''], ["",''], [88,'']]
  ]

  const text= ''
  const [number,setNumber] = React.useState();
  const [line,setLine] = React.useState(false);
  const [content,setContent] = React.useState(prevcontent);

  const handleNumber = (e) => {
    setNumber(e.target.value)
  }

  const isChecked = (col) => {
    if(col[0] === '') {
      return true
    }
    return col[1] === 'checked';
  }

  const rowIsLine = (row) => row.reduce((ac,col) => ac && isChecked(col),true) 

  const handleClick = () => {
    setContent(content.map( row => {
        return (row.map(
           col => {
            if(col[0] === parseInt(number)){return [col[0],'checked'];}
            return col;
           }))
        }
    ))
    setLine(content.reduce( (ac , row) => ac || rowIsLine(row),false))
  }


  const showLine = () => {
    if(line) {
      return "LINEA!:)"
    }
  }

  const mapColumnsContent = (row) => {
    return row.map(col =>
      <td  key={Math.random()}>
        <Cell content={col} />
      </td>);
  }

  const renderRaws = () => {
    return content.map(row =>
      <tbody key={Math.random()}>
      <tr>
          {mapColumnsContent(row)}
      </tr>
      </tbody>);
  }
  return (
    <div className="App">
      <h1>Bingo checker!:)</h1>
      <input style={{"margin-bottom":"20px"}} placeholder="Que numero salio?" value={number} onChange={handleNumber}/>
      <button onClick={handleClick} >Check</button>
      <table style={{border:"2px solid black",margin:'auto'}}>
      {renderRaws()}
      </table>
      {showLine()}
    </div>
  );
}

export default App;
