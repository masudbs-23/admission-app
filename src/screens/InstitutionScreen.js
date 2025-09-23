import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const institutes = [
  {
    id: 1,
    name: 'Algoma University',
    location: 'Nova Scotia, Canada',
    programs: '2 matching programs',
    acceptance: '74%',
    cost: '$12k',
    logoType: 'algoma',
  },
  {
    id: 2,
    name: 'Acadia University',
    location: 'Nova Scotia, Canada',
    programs: '2 matching programs',
    acceptance: '74%',
    cost: '$12k',
    logoType: 'acadia',
  },
  {
    id: 3,
    name: 'Cal Arts University',
    location: 'Nova Scotia, Canada',
    programs: '2 matching programs',
    acceptance: '74%',
    cost: '$12k',
    logoType: 'calArts',
  },
];

const renderLogo = (type) => {
  switch (type) {
    case 'algoma':
      return <Text style={[styles.logo, styles.algomaLogo]}>Algoma</Text>;
    case 'acadia':
      return <Text style={[styles.logo, styles.acadiaLogo]}>🛡️</Text>;
    case 'calArts':
      return (
        <Text style={[styles.logo, styles.calArtsLogo]}>CAL{'\n'}ARTS</Text>
      );
    default:
      return null;
  }
};

const InstitutionScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState({}); // keep track of bookmarked institutes

  const filteredInstitutes = institutes.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerLeft}>
          {!searchActive ? (
            <Text style={styles.headerTitle}>Institutes</Text>
          ) : (
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              autoFocus
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (searchActive) {
              setSearchQuery(''); // reset search
              setSearchActive(false);
            } else {
              setSearchActive(true);
            }
          }}>
          <Ionicons
            name={searchActive ? 'close' : 'search'}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* Institutes List */}
      <ScrollView contentContainerStyle={[styles.list, { paddingBottom: 20 + insets.bottom }]}>
        {filteredInstitutes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('InstitutionDetails', { institute: item })
            }>
            <View style={styles.cardHeader}>
              <View style={styles.info}>
                {renderLogo(item.logoType)}
                <View style={styles.details}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                  <Text style={styles.programs}>{item.programs}</Text>
                </View>
              </View>

              {/* Bookmark Button */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation(); // stop parent card press
                  toggleBookmark(item.id);
                }}>
                <Ionicons
                  name={bookmarks[item.id] ? 'bookmark' : 'bookmark-outline'}
                  size={22}
                  color={bookmarks[item.id] ? '#DF252A' : '#ccc'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{item.acceptance}</Text>
                <Text style={styles.statLabel}>Acceptance Rate</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{item.cost}</Text>
                <Text style={styles.statLabel}>Average Cost</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
       {filteredInstitutes.length === 0 && (
  <View style={styles.noResultsContainer}>
    <Ionicons name="search-outline" size={64} color="#ccc" />
    <Text style={styles.noResultsTitle}>No Institutes Found</Text>
    <Text style={styles.noResultsSubtitle}>
      Try adjusting your search or filters to find what you're looking for.
    </Text>
  </View>
)}

      </ScrollView>
    </SafeAreaView>
  );
};

export default InstitutionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    flex: 1,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    fontSize: width * 0.04,
    height: 35,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  logo: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  algomaLogo: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    color: '#ff6b6b',
    fontSize: width * 0.03,
    paddingTop: 12,
  },
  acadiaLogo: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    fontSize: width * 0.045,
    paddingTop: 8,
  },
  calArtsLogo: {
    backgroundColor: '#00bcd4',
    color: '#fff',
    fontSize: width * 0.03,
    lineHeight: width * 0.035,
    paddingTop: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 6,
  },
  programs: {
    fontSize: width * 0.035,
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 12,
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: width * 0.035,
    color: '#666',
  },
 noResultsContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 80,
},
noResultsTitle: {
  fontSize: width * 0.05,
  fontWeight: '600',
  color: '#444',
  marginTop: 12,
},
noResultsSubtitle: {
  fontSize: width * 0.035,
  color: '#888',
  textAlign: 'center',
  marginTop: 6,
  paddingHorizontal: 20,
  lineHeight: 20,
},

});
