import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Icon from "./components/icon"
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {Card,CardBody,Container,Button,Col,Row} from "reactstrap";

const itemArray = new Array(9).fill("empty")
function App() {
  const  [isCross,setIsCross]
    = useState(false)
  const [winMessage,setWinMessage] = useState("")
  //const [isEmpty,setIsEmpty] = useState(true)

  const reloadGame = () => {
     setIsCross(false)
     setWinMessage("")
     //setIsEmpty(true)
     itemArray.fill("empty",0,9)
  }

  const checkIsWinner = () => { 
    //  checking  winner of the game
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} won`);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    }
  };
  
  const isTie = () => {
      if(!winMessage && itemArray.every((element)=>{
        if(element !== "empty")
          return true;
      }))
      setWinMessage("The Game is Tie");   
  };

  const changeItem = (itemNumber) =>{
     if (winMessage){
       //setIsEmpty(true)
       return toast(winMessage,{type : "success"})
     }
     if (itemArray[itemNumber] === "empty"){
         itemArray[itemNumber] = isCross ? "cross" : "circle"
         //setIsEmpty(false)
         setIsCross(!isCross) 
     }else{
       return toast("already filled",{type : "error"})
     }
     isTie()  
     checkIsWinner()
  }
  return (
    <Container className="p-5">
     <ToastContainer position="bottom-center"/>
     <Row>
      <Col md={6} className ="offset-md-3">
      { winMessage ? (
        <div className="mb-2 mt-2">
        <h1 className="text-primary.text-uppercase.text-center">
        {winMessage}
        </h1>
        <Button
        color="success"
        block
        onClick = {reloadGame} 
        >Reload the game </Button>
        </div>
      ) : (
        <h1 className="text-primary.text-uppercase.text-center">
        {isCross?"Cross":"Circle"} turns
        </h1>
      )}
        <div className = "grid">
           {itemArray.map((item,index)=>(
             <Card color="warning" onClick ={()=>changeItem(index)}>
               <CardBody className = "box" >
               <Icon name={item} />
               </CardBody>
             </Card>
           )
           )}  
        </div>
      </Col>
     </Row>
    </Container>
  );
}

export default App;
