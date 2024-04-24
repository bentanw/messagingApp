import './App.css';
import SignIn from '@/pages/SignIn';
import Chat from '@/components/Chat'
import {auth} from './firebase.jsx'
import {useAuthState} from 'react-firebase-hooks/auth'

function App() {

  const [user] = useAuthState(auth)

  return (
    <>
      {user ? <Chat/> : <SignIn/>}
    </>
  );
}

export default App;
