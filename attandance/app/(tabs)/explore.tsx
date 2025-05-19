import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [employee, employee_name] = useState('');
  const [designation, designation_name] = useState('');
  const [gender, setGender] = useState('');

  const onSend = async () => {
    const form_value = {
      name: name,
      gender: gender,
      employee: employee,
      designation: designation,

    };
    try {
      const res = await fetch('https://employee-management-dev.apps.thecontrast.in/dummy/create-dummy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_value),
      });
      const data = await res.json();
      console.log('✅ Response:', data);
    } catch (err) {
      console.error('❌ Error:', err);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Dummy</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="mayur"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <RNPickerSelect onValueChange={setGender} value={gender} placeholder={{ label: "Select Gender", value: null }}
          items={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          style={{
            inputIOS: styles.input,     
            inputAndroid: styles.input,
          }}
        />
      </View>
        <View style={styles.inputGroup}>
        <Text style={styles.label}>Employees</Text>
        <RNPickerSelect onValueChange={setGender} value={employee_name} placeholder={{ label: "Select Employee", value: null }}
          items={[
            { label: 'Arun', value: 'arun' },
            { label: 'Bhavesh', value: 'bhavesh' },
            { label: 'Abhishek', value: 'abhishek' },
            { label: 'Rudra', value: 'rudra' },
            { label: 'Shreeram', value: 'shreeram' },
            { label: 'Viraj', value: 'viraj' },
            { label: 'Shubham', value: 'shubham' },
          ]}
          style={{
            inputIOS: styles.input,     
            inputAndroid: styles.input,
          }}
        />
      </View>
       <View style={styles.inputGroup}>
        <Text style={styles.label}>Designations</Text>
        <TextInput
          style={styles.input}
          placeholder="mayur"
          value={designation}
          onChangeText={designation_name}
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSend}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#555',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
