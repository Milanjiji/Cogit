import React, { createContext, useEffect, useState } from 'react';
import Sound from 'react-native-sound';

export const SoundContext = createContext();

const SoundContextProvider = ({ children }) => {

  const [songs,setSongs] = useState([
    {id:1,song:'10YyAB7jvmbGAOvyhBGo7YKuFLkkjV_sF'}
  ])
  const [playing,setPlaying] = useState('')
  
  const [sound] = useState(new Sound('https://drive.google.com/uc?id=10YyAB7jvmbGAOvyhBGo7YKuFLkkjV_sF','' ,(error)=>{
    console.log(error);
  }, Sound.MAIN_BUNDLE));
  
  useEffect(() => {
    return () => {
      sound.stop();
      sound.release();
    };
  }, []);

  return (
    <SoundContext.Provider value={sound}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContextProvider;
