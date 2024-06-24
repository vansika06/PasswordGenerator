import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length, setLen] = useState(8)//default length value given as 8
  const [numAllow, setnumAllow] = useState(false) 
  const [charAllow, setcharAllow] = useState(false)
  const [passwd,set]=useState("");
  const pswdRef=useRef(null);
  const pswdGen=useCallback(()=>{
    let p="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllow){
      str+="0123456789"
    }
    if(charAllow){
      str+="!@#%$*(){}[]/?"
    }
    for(let i=1;i<=length;i++){
      let n=Math.floor(Math.random()*str.length)
      p+=str.charAt(n);
    }//jitna length k pswd chahiye utna loop
    set(p)
  },
    [length,numAllow,charAllow,set])
    const copyTOClip=useCallback(()=>{
      pswdRef.current?.select()
      pswdRef.current?.setSelectionRange(0,101)
      window.navigator.clipboard.writeText(passwd)
    },[passwd]);
    useEffect(()=>{
      pswdGen()
    },[length,numAllow,charAllow,pswdGen])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text'
        value={passwd}
        placeholder='password'
        className='outline-none w-full py-1 px-3'
        ref={pswdRef}
        readOnly/>
      <button  className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyTOClip}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
       <input type='range'
       min={6}
       max={100}
       value={length}
       className='cursor-pointer'
       onChange={(e)=>{
        setLen(e.target.value)
       }}/>
       
       <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input
          type="checkbox"
          defaultChecked={numAllow}
          id="numberInput"
          onChange={() => {
              setnumAllow((prev) => !prev);
          }}
      />
       <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input
          type="checkbox"
          defaultChecked={charAllow}
          id="charInput"
          onChange={() => {
              setcharAllow((prev) => !prev);
          }}
      />
       <label htmlFor='charInput'>characters</label>
        </div> 

      </div>
     </div>
    </>
  )
}

export default App
