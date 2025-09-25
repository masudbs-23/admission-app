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
import { useLanguage } from '../context/LanguageContext';
import {
  launchCamera as rnLaunchCamera,
  launchImageLibrary as rnLaunchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row with spacing
const PROFILE_COMPLETION = 75;

// Document Upload Screen
const DocumentUploadScreen = ({ onSave }) => {
  const { t } = useLanguage();
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
        t('submit'),
        t('tapHint'),
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
                  color="#9CA3AF"
                />
                <Text style={styles.uploadTitle}>{title}</Text>
              </View>
            ) : (
              <View style={styles.fileWrapper}>
                <Ionicons name="document-outline" size={38} color="#9CA3AF" />
                <Text style={styles.uploadTitle}>{title}</Text>
              </View>
            )}
          </>
        ) : (
          <TouchableOpacity
            style={styles.emptyCard}
            onPress={() => pickFile(type)}
            activeOpacity={0.8}>
            <Ionicons name="document-text-outline" size={38} color="#9CA3AF" />
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
        <Text style={styles.sectionTitle}>{t('uploadYourDocuments')}</Text>
        <Text style={styles.sectionSubtitle}>
          {t('tapHint')}
        </Text>

        <View style={styles.row}>
          <UploadCard title={t('bscCertificate')} type="bsc" file={files.bsc} />
          <UploadCard title={t('mscCertificate')} type="msc" file={files.msc} />
        </View>
        <View style={styles.row}>
          <UploadCard title={t('passport')} type="passport" file={files.passport} />
          <UploadCard title={t('hscCertificate')} type="hsc" file={files.hsc} />
        </View>
        <View style={styles.row}>
          <UploadCard title={t('sscCertificate')} type="ssc" file={files.ssc} />
          <View style={{ width: CARD_WIDTH }} /> {/* Empty placeholder */}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={onSave}>
        <Text style={styles.submitText}>{t('saveChanges')}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main Profile Screen
const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('primary');
  const { logout } = useAuth();
  const { t } = useLanguage();

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
       <Text style={styles.formTitle}>{t('updatePrimaryInfo')} </Text>
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
          label={t('fullName')}
          placeholder={t('fullNamePlaceholder')}
          value={formData.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />
        <Input
          label={t('fathersName')}
          placeholder={t('fathersNamePlaceholder')}
          value={formData.fatherName}
          onChangeText={(text) => handleChange('fatherName', text)}
        />
        <Input
          label={t('email')}
          placeholder={t('emailPlaceholder')}
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <Input
          label={t('dob')}
          placeholder={t('dobPlaceholder')}
          value={formData.dob}
          onChangeText={(text) => handleChange('dob', text)}
        />
        <Input
          label={t('address')}
          placeholder={t('addressPlaceholder')}
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
       <Text style={styles.formTitle}>{t('updateAcademicInfo')} </Text>
        <Input
          label={t('bscUniversity')}
          placeholder={t('bscUniversityPlaceholder')}
          value={academicData.bscVarsity}
          onChangeText={(text) => handleChange('bscVarsity', text)}
        />
        <Input
          label={t('mscUniversityOptional')}
          placeholder={t('mscUniversityPlaceholder')}
          value={academicData.mscVarsity}
          onChangeText={(text) => handleChange('mscVarsity', text)}
        />
        <Input
          label={t('sscInstitution')}
          placeholder={t('sscInstitutionPlaceholder')}
          value={academicData.sscInstitution}
          onChangeText={(text) => handleChange('sscInstitution', text)}
        />
        <Input
          label={t('sscCgpa')}
          placeholder={t('sscCgpaPlaceholder')}
          keyboardType="decimal-pad"
          value={academicData.sscCgpa}
          onChangeText={(text) => handleChange('sscCgpa', text)}
        />
        <Input
          label={t('hscInstitution')}
          placeholder={t('hscInstitutionPlaceholder')}
          value={academicData.hscInstitution}
          onChangeText={(text) => handleChange('hscInstitution', text)}
        />
        <Input
          label={t('hscCgpa')}
          placeholder={t('hscCgpaPlaceholder')}
          keyboardType="decimal-pad"
          value={academicData.hscCgpa}
          onChangeText={(text) => handleChange('hscCgpa', text)}
        />
      </ScrollView>
    );
  };

  /* Update Input Component to accept `value` and `onChangeText` */
  const Input = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    multiline = false,
  }) => (
    <View style={styles.inputWrapper}>
      {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
      <TextInput
        style={[
          styles.input,
          multiline && { height: 90, textAlignVertical: 'top', paddingTop: 12 },
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
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
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>{t('profile')}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.progressText}>{`${PROFILE_COMPLETION}% ${t('profileComplete')}`}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${PROFILE_COMPLETION}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TabButton
          title={t('primaryInfo')}
          active={activeTab === 'primary'}
          onPress={() => setActiveTab('primary')}
        />
        <TabButton
          title={t('academicInfo')}
          active={activeTab === 'academic'}
          onPress={() => setActiveTab('academic')}
        />
        <TabButton
          title={t('documents')}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '600',
  },
  progressTrack: {
    width: 140,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#09BD71',
    borderRadius: 999,
  },

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
    marginTop: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputLabel: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
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
