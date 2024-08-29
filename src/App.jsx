import { useState,useEffect} from 'react'
import './App.css'
import questionsData from './assets/question.json'

function App() {
  const [score,setScore]=useState(0)
  const [showmark,setShowmark]=useState(false);
  const [cureques,setCureques]=useState(0)
  const [timing,setTiming]=useState(10)

  const anscheck=(correct)=>{
  let len=questionsData.length-1;
  console.log(len)
  console.log(cureques>=len);
    if(questionsData[cureques].answer==correct){
    setCureques((pre)=>pre+1);
    setScore((p)=>p+1);
    setTiming(10);
   }else{
    setCureques((pre)=>pre+1);
    setTiming(10);
   }
     if(cureques>=len){
   setShowmark(true);
    }
  }
  const handleretry=()=>{
    setShowmark(false);
    setScore(0);
    setCureques(0);
    setTiming(10);
  }

  useEffect(() => {
    let inter;
    if(timing>0 && !showmark){
      inter=setInterval(()=>{
        setTiming((tm)=>tm-1);
      },1000)
}else{
  clearInterval(inter);
  setShowmark(true);
} 

   return () =>clearInterval(inter) 
  }, [timing,showmark])

  return (
    <div className=".">
     {
      showmark ?(
        <div className="score" >
        <div className="sc">TOTAL SCORE: {score}/{questionsData.length}</div>
        <button className='ret' onClick={handleretry}>RETRY</button>
        </div>
      ):
      (<div className="total">
      <h3>QUESTION {cureques+1}</h3>
      <p>{questionsData[cureques].question}</p>
      <div className="options">{questionsData[cureques].options.map((item,index)=>(
        <button key={index} onClick={()=>{anscheck(item)}}>{item}</button>
      ))}
      </div>
      <div className="times">TIMING :<span>{timing}</span></div>
      </div>)
      }</div>
  )
}

export default App



