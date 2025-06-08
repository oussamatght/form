import "./side.css"
import MYFIRSTCOMPONENT from"./MYFIRSTCOMPONENT.JSX"
import { useState } from "react"
export default function Side(
) {
const[showMdel,SetShowmodel]=useState(false)
const[forminput,setinput]=useState({
  name:"",
  phonenumber:"",
  age:"",
  checked:true,
  salaryrange:"",
  buttondisible:true,
  show: false,

})
const btnisdisbled = (forminput.name === "" || forminput.age === "" || forminput.phonenumber === "");
let btncolor=""
if(btnisdisbled){
  btncolor="disbled"
}else{
  btncolor=""
}
function handleSubmit(event) {
  event.preventDefault();
  SetShowmodel(true);
  alert("the form has been submitted seccessfully")
}
return (

    <div className="inputt">
      <form action="">
        <h1>
          requesting a loan
        </h1>

        <hr />

        <label htmlFor="">Name</label>
        <br />
        <input type="text" value={forminput.name} onChange={(event) => {
          setinput({ ...forminput, name: event.target.value })
        }} />
        <br />
        <label htmlFor="">Phone Number</label><br />
        <input type="number" name="" id="" value={forminput.phonenumber} onChange={(event) => {
          setinput({ ...forminput, phonenumber: event.target.value })
        }} /> <br />
        <label htmlFor="">Age</label><br />
        <input type="number" name="" id="" value={forminput.age} onChange={(event) => {
          setinput({ ...forminput, age: event.target.value })
        }} />
        <br />
        <label htmlFor="">are you an employnne?</label><br />
        <input type="checkbox" name="" checked={forminput.checked} onChange={(event) => {
          setinput({ ...forminput, checked: event.target.checked })
        }} />
        <br />
        <label htmlFor="">salary</label>
        <br />

        <select value={forminput.salaryrange} onChange={(event) => {
          setinput({ ...forminput, salaryrange: event.target.value })
        }}>
          <option>less then 500$</option>
          <option>more then 500$</option>
          <option>500$</option>
        </select>
        <br />
        <button  onClick={handleSubmit}
          className={btncolor}
          disabled={btnisdisbled}
        >sumbit</button>
      </form>
       
<MYFIRSTCOMPONENT isVisble={showMdel}>
  </MYFIRSTCOMPONENT>
    </div>
   
  
)
 
 


}