import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

type DropdownOption = {
  title: string;
  value: string;
};

export default function RegistrationForm() {
  const route = useRoute();
  const id: any = route.params || {};
  const [name, setName] = useState('');
  const [employee, setEmployee] = useState('');
  const [designation, setDesignation] = useState('')
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id?.id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://employee-management-dev.apps.thecontrast.in/dummy/get-dummy-details?_id=${id.id}`
      );
      const data = await res.json();
      const fetched = data?.data;

      setName(fetched?.name || '');
      setEmployee(fetched?.employee?.title || fetched.employee || '');
      setDesignation( fetched?.designation?.title || fetched.designation || '',);
      setGender(fetched?.gender || '');
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const payload:any = {
      name,
      employee,
      designation,
      gender,
    };

    const url = id?.id
      ? `https://employee-management-dev.apps.thecontrast.in/dummy/update-dummy`
      : 'https://employee-management-dev.apps.thecontrast.in/dummy/create-dummy';

    try {
      setLoading(true);
      payload._id = id?.id
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload}),
      });
      const result = await res.json();
      if (res.ok) {
         router.navigate('/');
      }
      console.log(id?.id ? 'Updated:' : 'Created:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id?.id ? 'Update Dummy' : 'Add Dummy'}</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <RNPickerSelect
          onValueChange={setGender}
          value={gender}
          placeholder={{ label: 'Select Gender', value: null }}
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
        <Text style={styles.label}>Employee</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={employee}
          onChangeText={setEmployee}
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Designation</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={designation}
          onChangeText={setDesignation}
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{id?.id ? 'Update' : 'Submit'}</Text>
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
