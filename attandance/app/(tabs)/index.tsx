import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView,
} from 'react-native';
import axios from 'axios';

const PAGE_SIZE = 10;

export default function StudentList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

const fetchData = async () => {
  try {
    const response = await fetch('https://employee-management-dev.apps.thecontrast.in/dummy/get-dummy-list?page=1&page_size=23&search=');
    console.log('Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    setData(result.data || []);
    setTotalPages(1);
  } catch (error) {
    Alert.alert('Error', 'Failed to fetch data');
    console.error('Fetch Error:', error);
  }
};

  useEffect(() => {
    fetchData();
  });

  const handleEdit = (item:any) => {
    Alert.alert('Edit', `Edit clicked for ${item.name}`);
  };

  const handleDelete = (item:any) => {
    Alert.alert('Delete', `Delete clicked for ${item.name}`);
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.headerRow]}>
      <Text style={[styles.cell, styles.headerCell, { flex: 0.5, minWidth: 50 }]}>Sr. No.</Text>
      <Text style={[styles.cell, styles.headerCell, { flex: 1.5, minWidth: 150 }]}>Name</Text>
      <Text style={[styles.cell, styles.headerCell, { flex: 1, minWidth: 100 }]}>Gender</Text>
      <Text style={[styles.cell, styles.headerCell, { flex: 1.5, minWidth: 150 }]}>Designation</Text>
      <Text style={[styles.cell, styles.headerCell, { flex: 1, minWidth: 100 }]}>Employee</Text>
      <Text style={[styles.cell, styles.headerCell, { flex: 1.5, minWidth: 150 }]}>Action</Text>
    </View>
  );

  const renderItem = ({ item, index }:any) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 0.5, minWidth: 50 }]}>{(page - 1) * PAGE_SIZE + index + 1}</Text>
      <Text style={[styles.cell, { flex: 1.5, minWidth: 150 }]} numberOfLines={0} ellipsizeMode="tail">{item.name}</Text>
      <Text style={[styles.cell, { flex: 1, minWidth: 100 }]}>{item.gender}</Text>
      <Text style={[styles.cell, { flex: 1.5, minWidth: 150 }]} numberOfLines={0} ellipsizeMode="tail">{item.designation}</Text>
      <Text style={[styles.cell, { flex: 1, minWidth: 100 }]}>{item.employee}</Text>
      <View style={[styles.cell, { flex: 1.5, minWidth: 150, flexDirection: 'row', gap: 8 }]}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert('Add Student', 'Add Student button pressed')}
      >
        <Text style={styles.addButtonText}>Add Dummy data</Text>
      </TouchableOpacity>

      {/* Horizontal Scroll around the table */}
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          {renderHeader()}
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>
      </ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
          style={[styles.pageButton, page === 1 && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>{page} / {totalPages}</Text>
        <TouchableOpacity
          disabled={page === totalPages}
          onPress={() => setPage(page + 1)}
          style={[styles.pageButton, page === totalPages && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop:40, backgroundColor: '#fff' },
  addButton: {
    backgroundColor: '#007bff', padding: 8, borderRadius: 6,
    alignSelf: 'flex-end', marginBottom: 16,
  },
  addButtonText: { color: '#fff', fontWeight: '600' },
  tableContainer: { borderRadius: 6, overflow: 'hidden' },
  row: {
    flexDirection: 'row', paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  headerRow: { backgroundColor: '#f0f0f0', paddingHorizontal: 8 },
  cell: {
    textAlign: 'left', justifyContent: 'center',
    paddingHorizontal: 8,
  },
  headerCell: { fontWeight: '700' },
  pagination: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', marginTop: 16,
  },
  pageButton: {
    paddingVertical: 8, paddingHorizontal: 12,
    backgroundColor: '#007bff', marginHorizontal: 8,
    borderRadius: 4,
  },
  disabledButton: { backgroundColor: '#ccc' },
  pageButtonText: { color: '#fff', fontWeight: '600' },
  pageInfo: { fontWeight: '600', fontSize: 16 },
  editButton: { color: 'green', fontWeight: 'bold', marginRight: 8 },
  deleteButton: { color: 'red', fontWeight: 'bold' },
});
