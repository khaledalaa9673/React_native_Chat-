
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import PDFReader from 'rn-pdf-reader-js'

const FileViewer = (props) => {

   return (

      <View style={{ flex: 1 }}><PDFReader
            source={{
               uri: props.route.params.file,
            }}
         /></View>
   )
}

const styles = StyleSheet.create({

})

export default FileViewer

