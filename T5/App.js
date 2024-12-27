import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const items = [
  { id: '1', name: 'Mawar', description: 'Bunga Mawar melambangkan cinta dan keindahan. Biasanya berwarna merah, mawar sangat populer di berbagai budaya sebagai simbol kasih sayang.', icon: 'flower-rose', color: '#FF0000' },
  { id: '2', name: 'Kucing', description: 'Kucing adalah hewan peliharaan yang sangat populer di seluruh dunia. Mereka dikenal karena kepribadiannya yang mandiri dan sifat penyayang mereka.', icon: 'cat', color: '#FFA500' },
  { id: '3', name: 'Tulip', description: 'Bunga Tulip memiliki kelopak ramping dan warna yang cerah. Bunga ini melambangkan kecantikan dan kesempurnaan.', icon: 'flower-tulip', color: '#FF6347' },
  { id: '4', name: 'Kelinci', description: 'Kelinci adalah hewan yang dikenal dengan telinga panjang dan kaki belakang yang kuat. Mereka sering dianggap sebagai simbol kelahiran dan keberuntungan.', icon: 'rabbit', color: '#A9A9A9' },
];

const JenisScreen = ({ navigation, setSelectedItem }) => {
  const handleItemPress = (item) => {
    setSelectedItem(item);  
    navigation.navigate('Deskripsi'); 
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => handleItemPress(item)}>
      <Card.Content>
        <Avatar.Icon size={50} icon={item.icon} style={[styles.avatar, { backgroundColor: item.color }]} />
        <Title>{item.name}</Title>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

// Deskripsi Screen Component (formerly Profile) that shows selected item details
const DeskripsiScreen = ({ selectedItem }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Avatar.Icon size={80} icon={selectedItem.icon} style={[styles.avatar, { backgroundColor: selectedItem.color }]} />
          <Title>{selectedItem.name}</Title>
          <Paragraph>{selectedItem.description}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const Tab = createBottomTabNavigator();

// Main App Component
export default function App() {
  const [selectedItem, setSelectedItem] = useState(items[0]); 

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Jenis') {
                iconName = 'leaf'; // Home -> Jenis
              } else if (route.name === 'Deskripsi') {
                iconName = 'book'; // Profile -> Deskripsi
              }
              return <Icon name={iconName} color={color} size={size} />;
            },
            tabBarActiveTintColor: '#db7093',  // Soft pink for active tab
            tabBarInactiveTintColor: '#ffb6c1', // Lighter soft pink for inactive tab
          })}
        >
          <Tab.Screen 
            name="Jenis" 
            children={(props) => <JenisScreen {...props} setSelectedItem={setSelectedItem} />} 
          />
          <Tab.Screen 
            name="Deskripsi" 
            children={() => <DeskripsiScreen selectedItem={selectedItem} />} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB6C1',  // Soft pink background for the entire app
  },
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
});
