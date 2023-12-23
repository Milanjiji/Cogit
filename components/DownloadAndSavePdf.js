
import { faAngleRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React,{useEffect,useState} from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { storage } from "../Storage";
import RNFS from 'react-native-fs';
import axios from "axios";
import { Buffer } from "buffer";
const DownloadAndSavePdf = ({navigation,data}) =>{
    const [Colors,setColors] = useState([]);
    const [size,setSize] = useState('');
    const item = data.item
    const [fileExists,setFileExists] = useState(false);
    const [pdfPath,setPdfPath] = useState('');
    const [downloading,setDownloading] = useState(false);
    const [downloadPer,setDownloadPer] = useState('');

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        
        const getFileStatus = async () =>{
            const files = await RNFS.readDir('/data/user/0/com.cogitone/files/hidden_folder');
            const sanitizedFileName = item.name.replace(/\s+/g, '_');
            const fileNames = files.map(file => file.name);

            const fileExists = fileNames.includes(`${sanitizedFileName}.pdf`)
            
            if(fileExists){
              setFileExists(true)
              const internalPath = `${RNFS.DocumentDirectoryPath}/hidden_folder`;
              setPdfPath(`${internalPath}/${sanitizedFileName}.pdf`)

            }else{
              const internalPath = `${RNFS.DocumentDirectoryPath}/hidden_folder`;
              const isDirectoryExists = await RNFS.exists(internalPath);

              if (!isDirectoryExists) {
                await RNFS.mkdir(internalPath);
                // console.log(`Directory '${internalPath}' created.`);
              }
              try {
                const response = await axios.head(item.link);
                const fileSize = response.headers['content-length'];
                const fileSizeInKB = fileSize / 1024;
                const fileSizeInMB = fileSizeInKB / 1024;
                setSize(`${fileSizeInMB.toFixed(2)} MB`);
                // console.log("file size of ",item.name,"is : ",`${fileSizeInMB.toFixed(2)} MB`);
              } catch (error) {
                console.error('Error fetching file size: ', error);
                setSize('1 MB')
              }
              setFileExists(false);
            }
        }
        getFileStatus();
    },[])


    const onProgress = (percent) => {
        console.log(`Download progress: ${percent}%`);
        setDownloadPer(`${percent}%`)
      };


      
    const downloadAndSaveFile = async (fileUrl,fileName) => {
        setDownloading(true)
        const sanitizedFileName = fileName.replace(/\s+/g, '_');
        try {
            const response = await axios.get(fileUrl,{
                  responseType: 'arraybuffer',
                  onDownloadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onProgress(percentCompleted);
                  },
                }
              );
          const dataString = Buffer.from(response.data).toString('base64');
  
          const internalPath = `${RNFS.DocumentDirectoryPath}/hidden_folder`;
          const isDirectoryExists = await RNFS.exists(internalPath);

          if (!isDirectoryExists) {
            await RNFS.mkdir(internalPath);
            console.log(`Directory '${internalPath}' created.`);
          }

          const savePath = `${internalPath}/${sanitizedFileName}.pdf`;
    
          await RNFS.writeFile(savePath, dataString, 'base64');
    
          console.log('File saved successfully:', savePath);
          setPdfPath(savePath);
          setFileExists(true);
          setDownloading(false);
          return savePath;
        } catch (error) {
          console.error('Error downloading and saving file: ', error);
          setDownloading(false)
          throw error;
        }
      };

      const openPdf = () =>{
        if(fileExists){
          navigation.navigate('Cmap',{path:pdfPath})
        }
      }
  
    return(
        <TouchableOpacity onPress={openPdf} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,marginTop:10}} >
            <View style={{flexDirection:'row',alignItems:'center',width:'70%'}} >
                <Text style={{fontFamily:Colors.Medium,color:Colors.text,marginRight:20,fontSize:12}} >{item.id}</Text>
                <Text style={{fontFamily:Colors.Medium,color:Colors.text,fontSize:12}} >{item.name}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={()=>downloadAndSaveFile(item.link,item.name)} style={{alignItems:'center',marginRight:10,display:fileExists ? 'none' :'flex'}} >
                  <FontAwesomeIcon size={12} icon={faDownload} color={Colors.text} />
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginTop:2,fontSize:10}} >{ downloading ? downloadPer : size}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openPdf} style={{alignItems:'center',marginRight:25,display:!fileExists ? 'none' :'flex'}} >
                  <FontAwesomeIcon  icon={faAngleRight} color={Colors.text} />
              </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default DownloadAndSavePdf;