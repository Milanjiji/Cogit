import TrackPlayer,{Event} from "react-native-track-player";

export async function  setUpPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getCurrentTrack()
        isSetup = true;
    } catch (error) {
        await TrackPlayer.setupPlayer()
        isSetup = true
    } finally{
        return isSetup;
    }
}

export async function playBackService() {
    TrackPlayer.addEventListener(Event.RemotePause,()=>{
        TrackPlayer.pause()
    })
    TrackPlayer.addEventListener(Event.RemotePlay,()=>{
        TrackPlayer.play()
    })
    TrackPlayer.addEventListener(Event.RemoteNext,()=>{
        TrackPlayer.skipToNext()
    })
    TrackPlayer.addEventListener(Event.RemotePrevious,()=>{
        TrackPlayer.skipToPrevious()
    })
}