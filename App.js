
import React, { useState } from 'react';
import { View, StyleSheet, Text,  TouchableOpacity, Button, Modal, SafeAreaView, SectionList } from 'react-native';
import { Camera } from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';
import { CheckBox } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
   
   const handleCheck = () => {
     setIsChecked(!isChecked);
   };

  const openQRCodeModal = (task) => {
    setSelectedTask(task);
  };

  const closeQRCodeModal = () => {
    setSelectedTask(null);
  };

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setCameraOpen(true);
    } else {
      alert('Access to camera denied');  
    }
  };
  
  const DATA =[
    {
      title: '10/07/2023',
      data:['Buttare la pasta'],
    },
   ];

   const dato = {
    date : '10/07/2023',
    task : 'BUttare la pasta',
    fatto : isChecked,
   }


   const sendDataToServer = () =>{
      const jsonData = JSON.stringify(dato);
      fetch('http://192.168.1.161//backend_bernat/API.php',{
        method : 'POST',
        headers: {
          'Content-Type': 'applications/json',
        },
        body: jsonData,
      })
      .then(response => 
        response.text(),
        alert(jsonData)
        )
      //response.json()

      .catch(error => {
        // Gestisci l'errore
        alert(error);
      });
   };


  return (

    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.containerTitle}>TASK GENERALI</Text>
      </View>
      
      <SafeAreaView style={styles.container}>
       <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View style={styles.item}>
              <View style={styles.itemContainer}>
              <View>
                <CheckBox
                 checked={isChecked}
                  onPress={handleCheck}
                />
              </View>
                <Text style={styles.title}>{item}</Text>
                <View style={styles.button} >
                   <Button
                    title="Condividi"
                    onPress={() => openQRCodeModal(item)}      
                  />
                </View>
               
            </View>
          </View>
          )}
          renderSectionHeader={({section: {title}}) => (
          <Text style={styles.headerDate}>{title}</Text>
          )}
        />
      </SafeAreaView>
      <Modal visible={selectedTask !== null} animationType="slide">
            <View style={styles.modalContainer}>
              {selectedTask && (
              <>
               <Text style={styles.modalTitle}>QR Code</Text>
               <QRCode value={selectedTask.key} size={200} />
               <View style={styles.bottone} >
                  <Button title="Chiudi" onPress={closeQRCodeModal} />
               </View>
              </>
              )}
           </View>
         </Modal>

      {/* Camera modal */}
      <Modal visible={cameraOpen} animationType="slide">
        <View style={styles.modalContainer}>
          <Camera style={styles.camera} />
          <View style={styles.closeButtonContainer}>
          <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Button title="Chiudi" onPress={() => setCameraOpen(false)} />
          </TouchableOpacity>
        }
      />
           
          </View>
        </View>
      </Modal>


      <View style={styles.buttonContainer}>
  <View style={styles.button1}>
    <Button title="Aggiungi Task" onPress={openCamera} />
  </View>
  <View style={styles.button1}>
    <Button title="Salva" onPress={sendDataToServer} />
  </View>
</View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor:'black',
    padding: 40,
    width: '100%',
  },
  containerTitle:{
    marginTop:10,
    fontSize: 20,
    color:'white',
    textAlign:'center',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  headerDate:{
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 15,
    width: '100%',
    padding:10,
    marginTop: 30,
    borderWidth: 2,
    backgroundColor:'wheat',
    borderColor: 'wheat',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: 'wheat',
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    marginStart: 10,
  },
  item:{
    marginTop: 10,
  },
  button: {
    marginLeft: 10,
    marginEnd:10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  bottone:{
    marginTop:15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  button1:{
    width:'40%',
    backgroundColor:'blue',
    margin: 10,
    borderRadius:15,
  },
  camera: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});
