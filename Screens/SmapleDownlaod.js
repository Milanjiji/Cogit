import React from 'react'
import { Text, View } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
// npm install axios react-native-fetch-blob react-native-fs
const SampleDownloadStore = () =>{

    const downloadAndSaveFile = async (fileUrl) => {
        try {
          const { config, fs } = RNFetchBlob;
          const tempPath = fs.dirs.TemporaryDir;
      
          const response = await config({
            fileCache: true,
            path: `${tempPath}/temp.pdf`, // Temporary path
          }).fetch('GET', fileUrl);
      
          // Move the downloaded file to the app's internal storage
          const internalPath = `${RNFS.DocumentDirectoryPath}/hidden_folder`;
          await RNFS.mkdir(internalPath); // Create the hidden folder if not exists
          const savePath = `${internalPath}/sample.pdf`;
      
          await RNFS.moveFile(response.path(), savePath);
      
          console.log('File saved successfully:', savePath);
          return savePath;
        } catch (error) {
          console.error('Error downloading and saving file: ', error);
          throw error;
        }
      };
    //   useEffect(() => {
    //     const fileUrl = 'YOUR_GOOGLE_DRIVE_FILE_URL'; // Replace with your file URL
    
    //     downloadAndSaveFile(fileUrl)
    //       .then((filePath) => {
    //         console.log('PDF downloaded and saved successfully:', filePath);
    //         // Now you can use the downloaded PDF file as needed
    //       })
    //       .catch((error) => {
    //         console.error('Error downloading and saving PDF: ', error);
    //       });
    //   }, []);
    
    return(
        <View>
            <Text>Hello This is amsple download and storeing in the baseline</Text>


        </View>
    )
}

export default SampleDownloadStore;