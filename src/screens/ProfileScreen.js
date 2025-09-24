import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import {
  launchCamera as rnLaunchCamera,
  launchImageLibrary as rnLaunchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row with spacing

// Document Upload Screen
const DocumentUploadScreen = ({ onSave }) => {
  const [files, setFiles] = useState({
    bsc: null,
    msc: null,
    passport: null,
    hsc: null,
    ssc: null,
  });

  const pickFile = async (type) => {
    try {
      Alert.alert(
        'Select Option',
        'Choose how you want to upload your document',
        [
          {
            text: 'Take Photo',
            onPress: () => launchCamera(type),
          },
          {
            text: 'Choose from Gallery',
            onPress: () => launchImagePicker(type),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    } catch (err) {
      console.log('Error picking file: ', err);
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  const launchCamera = async (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      cameraType: 'back',
      quality: 0.8,
      saveToPhotos: false,
    };
    const result = await rnLaunchCamera(options);
    if (result?.didCancel || result?.errorCode) {
      if (result?.errorCode === 'permission') {
        Alert.alert('Permission required', 'Camera permission is needed to take photos');
      }
      return;
    }
    const asset = result?.assets && result.assets[0];
    if (asset?.uri) {
      const file = {
        name: asset.fileName || `photo_${type}_${Date.now()}.jpg`,
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        mimeType: asset.type || 'image/jpeg',
        size: asset.fileSize,
      };
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const launchImagePicker = async (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
      selectionLimit: 1,
    };
    const result = await rnLaunchImageLibrary(options);
    if (result?.didCancel || result?.errorCode) {
      if (result?.errorCode === 'permission') {
        Alert.alert('Permission required', 'Gallery permission is needed to select photos');
      }
      return;
    }
    const asset = result?.assets && result.assets[0];
    if (asset?.uri) {
      const file = {
        name: asset.fileName || `image_${type}_${Date.now()}.jpg`,
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        mimeType: asset.type || 'image/jpeg',
        size: asset.fileSize,
      };
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const launchDocumentPicker = async (type) => {
    // PDF picker functionality removed due to compatibility issues
    Alert.alert('Info', 'PDF picker temporarily disabled. Please use camera or gallery for now.');
  };

  const removeFile = (type) => {
    Alert.alert('Remove File', 'Are you sure you want to remove this file?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        onPress: () => setFiles((prev) => ({ ...prev, [type]: null })),
      },
    ]);
  };

  const UploadCard = ({ title, type, file }) => {
    const isImage = file?.mimeType?.startsWith('image/');
    const isPdf = file?.mimeType === 'application/pdf';

    return (
      <View style={styles.uploadCard}>
        {file ? (
          <>
            {isImage ? (
              <View style={{ flex: 1, width: '100%', height: '100%' }}>
                <Image
                  source={{ uri: file.uri }}
                  style={styles.fullImage}
                  resizeMode="cover"
                />

                {/* Cross Button */}
                <TouchableOpacity
                  style={styles.crossButton}
                  onPress={() => removeFile(type)}>
                  <Ionicons name="close-circle" size={24} color="#e53935" />
                </TouchableOpacity>

                {/* Title Overlay */}
                <View style={styles.imageTitleWrapper}>
                  <Text style={styles.imageTitle}>{title}</Text>
                </View>
              </View>
            ) : isPdf ? (
              <View style={styles.fileWrapper}>
                <Ionicons
                  name="document-text-outline"
                  size={38}
                  color="#e53935"
                />
                <Text style={styles.uploadTitle}>{title}</Text>
              </View>
            ) : (
              <View style={styles.fileWrapper}>
                <Ionicons name="document-outline" size={38} color="#09BD71" />
                <Text style={styles.uploadTitle}>{title}</Text>
              </View>
            )}
          </>
        ) : (
          <TouchableOpacity
            style={styles.emptyCard}
            onPress={() => pickFile(type)}
            activeOpacity={0.8}>
            <Ionicons name="cloud-upload-outline" size={38} color="#09BD71" />
            <Text style={styles.uploadTitle}>{title}</Text>
            <Text style={styles.uploadHint}>Tap to upload</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.uploadContainer}>
        <Text style={styles.sectionTitle}>Upload Your Documents</Text>
        <Text style={styles.sectionSubtitle}>
          Tap on a card to upload, long press to remove
        </Text>

        <View style={styles.row}>
          <UploadCard title="BSc Certificate" type="bsc" file={files.bsc} />
          <UploadCard title="MSc Certificate" type="msc" file={files.msc} />
        </View>
        <View style={styles.row}>
          <UploadCard title="Passport" type="passport" file={files.passport} />
          <UploadCard title="HSC Certificate" type="hsc" file={files.hsc} />
        </View>
        <View style={styles.row}>
          <UploadCard title="SSC Certificate" type="ssc" file={files.ssc} />
          <View style={{ width: CARD_WIDTH }} /> {/* Empty placeholder */}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={onSave}>
        <Text style={styles.submitText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main Profile Screen
const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('primary');
  const { logout } = useAuth();

  const onSave = () => {
    Alert.alert('Saved', 'Your information has been saved successfully!');
  };

  // Inside ProfileScreen component

  const PrimaryInfoForm = () => {
    const [profileImage, setProfileImage] = useState(null);

    // Default user info values
    const [formData, setFormData] = useState({
      fullName: 'Masud Rana',
      fatherName: 'Rana Khan',
      email: 'masudrana15924@example.com',
      dob: '1995-01-01',
      address: 'Dhaka, Bangladesh',
    });

    const pickImage = async () => {
      const result = await rnLaunchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.8,
        selectionLimit: 1,
      });
      if (result?.didCancel || result?.errorCode) {
        if (result?.errorCode === 'permission') {
          Alert.alert('Permission required', 'Gallery access is needed to select a profile picture.');
        }
        return;
      }
      const asset = result?.assets && result.assets[0];
      if (asset?.uri) {
        setProfileImage(asset.uri);
      }
    };

    const handleChange = (key, value) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <ScrollView contentContainerStyle={styles.formContainer}>
       <Text style={styles.formTitle}>Update Your Primary Info </Text>
        <View style={styles.avatarWrapper}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : { uri: 'https://i.pravatar.cc/100?img=12' }
            }
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <Ionicons name="pencil" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <Input
          placeholder="Full Name"
          value={formData.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />
        <Input
          placeholder="Father's Name"
          value={formData.fatherName}
          onChangeText={(text) => handleChange('fatherName', text)}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <Input
          placeholder="Date of Birth"
          value={formData.dob}
          onChangeText={(text) => handleChange('dob', text)}
        />
        <Input
          placeholder="Address"
          multiline
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
        />
      </ScrollView>
    );
  };

  const AcademicInfoForm = () => {
    const [academicData, setAcademicData] = useState({
      bscVarsity: 'Dhaka University',
      mscVarsity: 'Dhaka University',
      sscInstitution: 'ABC High School',
      sscCgpa: '5.00',
      hscInstitution: 'XYZ College',
      hscCgpa: '4.90',
    });

    const handleChange = (key, value) => {
      setAcademicData((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <ScrollView contentContainerStyle={styles.formContainer}>
       <Text style={styles.formTitle}>Update Your Academic Info </Text>
        <Input
          placeholder="BSc Varsity Name"
          value={academicData.bscVarsity}
          onChangeText={(text) => handleChange('bscVarsity', text)}
        />
        <Input
          placeholder="MSc Varsity Name (Optional)"
          value={academicData.mscVarsity}
          onChangeText={(text) => handleChange('mscVarsity', text)}
        />
        <Input
          placeholder="SSC Institution Name"
          value={academicData.sscInstitution}
          onChangeText={(text) => handleChange('sscInstitution', text)}
        />
        <Input
          placeholder="SSC CGPA"
          keyboardType="decimal-pad"
          value={academicData.sscCgpa}
          onChangeText={(text) => handleChange('sscCgpa', text)}
        />
        <Input
          placeholder="HSC Institution Name"
          value={academicData.hscInstitution}
          onChangeText={(text) => handleChange('hscInstitution', text)}
        />
        <Input
          placeholder="HSC CGPA"
          keyboardType="decimal-pad"
          value={academicData.hscCgpa}
          onChangeText={(text) => handleChange('hscCgpa', text)}
        />
      </ScrollView>
    );
  };

  /* Update Input Component to accept `value` and `onChangeText` */
  const Input = ({
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    multiline = false,
  }) => (
    <View style={styles.inputWrapper}>
      <TextInput
        style={[
          styles.input,
          multiline && { height: 80, textAlignVertical: 'top' },
        ]}
        placeholder={placeholder}
        placeholderTextColor="#888"
        keyboardType={keyboardType}
        multiline={multiline}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#111" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TabButton
          title="Primary Info"
          active={activeTab === 'primary'}
          onPress={() => setActiveTab('primary')}
        />
        <TabButton
          title="Academic Info"
          active={activeTab === 'academic'}
          onPress={() => setActiveTab('academic')}
        />
        <TabButton
          title="Upload Docs"
          active={activeTab === 'documents'}
          onPress={() => setActiveTab('documents')}
        />
      </View>

      <View style={{ flex: 1 }}>
        {activeTab === 'primary' && <PrimaryInfoForm />}
        {activeTab === 'academic' && <AcademicInfoForm />}
        {activeTab === 'documents' && <DocumentUploadScreen onSave={onSave} />}
      </View>

      {activeTab !== 'documents' && (
        <TouchableOpacity style={[styles.floatingButton, { bottom: 20 + insets.bottom }]} onPress={onSave}>
          <Text style={styles.submitText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

/* -------------------
   Reusable Components
---------------------*/
const Input = ({
  placeholder,
  keyboardType = 'default',
  multiline = false,
}) => (
  <View style={styles.inputWrapper}>
    <TextInput
      style={[
        styles.input,
        multiline && { height: 80, textAlignVertical: 'top' },
      ]}
      placeholder={placeholder}
      placeholderTextColor="#888"
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </View>
);

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tab, active && styles.activeTab]}
    onPress={onPress}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default ProfileScreen;

/* -------------------
   Styles
---------------------*/
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: '#09BD71' },
  tabText: { fontSize: 14, color: '#777', fontWeight: '500' },
  activeTabText: { color: '#09BD71', fontWeight: '600' },

  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 48,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#F8FAFC',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#09BD71',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  // Upload Section
  uploadContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  uploadCard: {
    width: CARD_WIDTH,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  crossButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
  },
  imageTitleWrapper: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
  },
  fileWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  uploadHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
  },
  formContainer: { paddingBottom: 100 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    marginLeft: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginLeft: 18,
    marginTop:15
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    marginLeft: 8,
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#09BD71',
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
