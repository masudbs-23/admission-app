import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { ROUTES } from '../config/routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get("window");

const InstituteDetailsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { institute } = route.params;

  // Dummy data
  const programs = [
    {
      name: "Computer Science",
      intake: "Fall 2025",
      deadline: "June 30, 2025",
      duration: "4 Years",
      degree: "B.Sc",
      subjects: ["AI", "Cybersecurity", "Data Science"],
    },
    {
      name: "Business Administration",
      intake: "Spring 2025",
      deadline: "Dec 15, 2024",
      duration: "3 Years",
      degree: "BBA",
      subjects: ["Marketing", "Finance", "HR Management"],
    },
    {
      name: "Design & Arts",
      intake: "Fall 2025",
      deadline: "July 10, 2025",
      duration: "4 Years",
      degree: "B.Des",
      subjects: ["Graphic Design", "Fashion Design"],
    },
  ];

  const requirements = [
    "Minimum GPA: 3.0",
    "IELTS: 6.5 or TOEFL: 90",
    "Copy of passport",
    "Transcripts & certificates",
  ];

  const scholarships = [
    { name: "Merit-based Scholarship", amount: "50% Tuition Fee" },
    { name: "Sports Excellence Scholarship", amount: "25% Tuition Fee" },
  ];

  const facilities = ["Library", "Sports Complex", "Laboratories", "Hostel", "Cafeteria"];

  const reviews = [
    { name: "Alice", rating: 5, comment: "Great campus and faculty!" },
    { name: "Bob", rating: 4, comment: "Amazing programs, but accommodation is limited." },
  ];

  const contact = {
    email: "admissions@exampleuniversity.com",
    phone: "+1 234 567 890",
    website: "https://www.exampleuniversity.com",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]}>
        {/* Cover Image with Back Button */}
        <View style={[styles.imageContainer]}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2sw4hgQft6loHWnHAksFXmDsIpPu8jqdhg&s",
            }}
            style={styles.image}
          />
          <TouchableOpacity 
            style={[styles.backButton, { top: 16 + insets.top }]} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Basic Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Institute Info</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-sharp" size={20} color="#DF252A" />
            <Text style={styles.infoText}>New York, USA</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={20} color="#DF252A" />
            <Text style={styles.infoText}>Private University</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="star" size={20} color="#DF252A" />
            <Text style={styles.infoText}>Top 50 in USA</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="attach-money" size={20} color="#DF252A" />
            <Text style={styles.infoText}>$25,000 per year</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="link" size={20} color="#DF252A" />
            <Text style={[styles.infoText, { color: "#0077CC" }]}>https://www.exampleuniversity.com</Text>
          </View>
        </View>

        {/* Programs Offered */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Programs Offered</Text>
          {programs.map((program, index) => (
            <View key={index} style={styles.programCard}>
              <Text style={styles.programName}>{program.name}</Text>
              <View style={styles.programInfoRow}>
                <Text style={styles.programInfoLabel}>Intake:</Text>
                <Text style={styles.programInfoValue}>{program.intake}</Text>
              </View>
              <View style={styles.programInfoRow}>
                <Text style={styles.programInfoLabel}>Deadline:</Text>
                <Text style={styles.programInfoValue}>{program.deadline}</Text>
              </View>
              <View style={styles.programInfoRow}>
                <Text style={styles.programInfoLabel}>Duration:</Text>
                <Text style={styles.programInfoValue}>{program.duration}</Text>
              </View>
              <View style={styles.programInfoRow}>
                <Text style={styles.programInfoLabel}>Degree:</Text>
                <Text style={styles.programInfoValue}>{program.degree}</Text>
              </View>
              <View>
                <Text style={[styles.programInfoLabel, { marginTop: 6 }]}>Subjects:</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}>
                  {program.subjects.map((sub, idx) => (
                    <View key={idx} style={styles.subjectTag}>
                      <Text style={styles.subjectText}>{sub}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Admission Requirements */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Admission Requirements</Text>
          {requirements.map((req, idx) => (
            <View key={idx} style={styles.requirementRow}>
              <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
              <Text style={styles.requirementText}>{req}</Text>
            </View>
          ))}
        </View>

        {/* Scholarships */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Scholarships</Text>
          {scholarships.map((sch, idx) => (
            <View key={idx} style={styles.scholarshipCard}>
              <Text style={styles.programName}>{sch.name}</Text>
              <Text style={styles.programInfoValue}>{sch.amount}</Text>
            </View>
          ))}
        </View>

        {/* Facilities */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {facilities.map((fac, idx) => (
              <View key={idx} style={styles.facilityTag}>
                <Text style={styles.facilityText}>{fac}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.infoRow}>
            <Ionicons name="mail" size={20} color="#DF252A" />
            <Text style={styles.infoText}>{contact.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call" size={20} color="#DF252A" />
            <Text style={styles.infoText}>{contact.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="link" size={20} color="#DF252A" />
            <Text style={[styles.infoText, { color: "#0077CC" }]}>{contact.website}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Apply Now Button */}
      <TouchableOpacity style={[styles.applyButton, { bottom: 30 + insets.bottom }]} onPress={() => navigation.navigate(ROUTES.MAIN.APPLICATION_FORM)}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InstituteDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.3,
    // shadowRadius: 6,
    // elevation: 5,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DF252A",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: width * 0.037,
    color: "#555",
  },
  programCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  programName: {
    fontSize: width * 0.04,
    fontWeight: "700",
    marginBottom: 8,
    color: "#DF252A",
  },
  programInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  programInfoLabel: {
    fontSize: width * 0.035,
    color: "#666",
  },
  programInfoValue: {
    fontSize: width * 0.035,
    fontWeight: "600",
    color: "#333",
  },
  subjectTag: {
    backgroundColor: "#DF252A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  subjectText: {
    color: "#fff",
    fontSize: width * 0.03,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  requirementText: {
    marginLeft: 8,
    fontSize: width * 0.035,
    color: "#555",
  },
  scholarshipCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  facilityTag: {
    backgroundColor: "#DF252A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  facilityText: {
    color: "#fff",
    fontSize: width * 0.033,
  },
  applyButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2B2A29",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: width * 0.045,
  },
});