import React, { createContext, useEffect, useState } from 'react';
import Sound from 'react-native-sound';
import TrackPlayer from 'react-native-track-player';
export const SoundContext = createContext();

const SoundContextProvider = ({ children }) => {

  

  const [songs,setSongs] = useState([
    {id:1,song:'1akxUUlBRo1gLJScImdgKUef2KnccZkeX'},
    {id:2,song:'1Xo4I6t2jTFVR6oqU4rcEjZypIAUTDQ86'},
    {id:3,song:'1hqk2jnDw-sQ2SMFljhw_XynQ5v8MQGVl'},
    {id:4,song:'1ldB7IV8HrTk09hTOxaiKWGXeJcp9K17p'}
  ])
  const [playing,setPlaying] = useState('');
  
  // const [sound] = useState(new Sound('https://drive.google.com/uc?id=10YyAB7jvmbGAOvyhBGo7YKuFLkkjV_sF','' ,(error)=>{
  //   console.log(error);
  // }, Sound.MAIN_BUNDLE));

  useEffect(()=>{
    

    const addSongs = async () =>{
      const queue = await TrackPlayer.getQueue();
      if(queue.length == 0){
        await TrackPlayer.add({
          id: 1,
          url: 'https://drive.google.com/uc?id=10YyAB7jvmbGAOvyhBGo7YKuFLkkjV_sF',
          title: 'No title for this song',
          artist: 'milan',
        })
      }else{
        console.log("there is something int uese",queue);
      }
    }
    addSongs();
  },[])


  
  useEffect(() => {
    // return () => {
    //   sound.stop();
    //   sound.release();
    // };
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  return (
    <SoundContext.Provider value={TrackPlayer} >
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContextProvider;
