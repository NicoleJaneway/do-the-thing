import React, {useState, useRef, useEffect} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SetTimer({ type, length, setLength }) {
    const [displayLength, setDisplayLength] = useState(length.toString());
      useEffect(() => {
        setDisplayLength(length.toString());
      }, [length]);
    
      const incrementTimer = () => {
        setLength((prev) => prev + 1);
      };
    
      const decrementTimer = () => {
        if (length > 1) setLength((prev) => prev - 1);
      };
    
      // TODO:  fix
      const handleChange = ({ value }) => {
        setDisplayLength(value);
      };
    
      const handleSave = ({ value }) => {
        const userInput = Number.parseInt(value, 10);
        if (userInput > 0 && userInput <= 99) {
          setLength(userInput);
        }
      };

    return (
        <View style={{padding: 10}}>
            <Text style={{textAlign: "center"}}>{type} Length</Text>
            <View style={styles.fixToText}>
                <Button 
                    title="⬆️"
                    color="rgba(0, 0, 0, 0)"
                    onPress ={incrementTimer} />
                <TextInput
                    onChangeText={setDisplayLength}
                    value={displayLength}
                    style = {{ width: 20, textAlign: 'center' }}
                />    
                <Button 
                    title="⬇️"
                    color="rgba(0, 0, 0, 0)"
                    onPress ={decrementTimer} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
      },
  });
  