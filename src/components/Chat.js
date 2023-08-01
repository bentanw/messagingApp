import React, { useState, useEffect, useRef} from 'react'
import { db, auth } from '../firebase'
import firebase from 'firebase/compat/app';
import SendMessages from './SendMessages'
import { Grid, Button, Box } from '@material-ui/core'

function Chat() {

  const scroll = useRef()

  const [messages, setMessages] = useState([])

  useEffect(() => {
    db.collection("messages").orderBy("createdAt").limit(50).onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  function changeAccount(){
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <div>

      <Grid container spacing={0} style={{width:'100%'}}>

        <Grid item xs={12} md={10}>
          <div className='msgs'>
            {messages.map(({id, text, photoURL, uid}) => (
              <div>
                <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                  <img src={photoURL}></img>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <SendMessages scroll={scroll}/> 
          <div ref={scroll}></div>
        </Grid>

        <Grid item xs={0} md={2}>
          <Box sx={{bgcolor:"#F5FCFF", height:"100vh", position:"fixed", width:"16.667%", textAlign:"center"}}>

            <Box mt={16}>
              <img src={auth.currentUser.photoURL} className='border-2 border-black rounded-2xl block mx-auto'></img>
            </Box>

            <Box mt={4}>
              <Button onClick={() => {changeAccount()}} variant="contained" color="primary">Change Account</Button>
            </Box>
          
            {/* Sign out button */}
            <Box mt={2} textAlign="center">
              <Button onClick={() => auth.signOut()} variant="contained" color="primary">Sign Out</Button>
            </Box>
          </Box>
        </Grid>

      </Grid>

    </div>
  )
}

export default Chat 