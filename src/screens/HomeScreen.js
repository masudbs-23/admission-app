import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHeader from '../components/home/HomeHeader';
import EventsSection from '../components/home/EventsSection';
import AdvisorCard from '../components/home/AdvisorCard';
import WhyChooseUs from '../components/home/WhyChooseUs';
import InstitutionsSection from '../components/home/InstitutionsSection';
import ImageSlider from '../components/home/ImageSlider';
import { useMe } from '../hooks/useMe';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Fetch logged-in user profile (includes profileCompletion.percentage)
  const { data: me, isLoading: isMeLoading } = useMe();

  const profileName = me?.name || me?.user?.name || 'User';
  const profilePct = typeof me?.profileCompletion?.percentage === 'number'
    ? me.profileCompletion.percentage
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Sticky Header */}
      <HomeHeader insets={insets} navigation={navigation} profileName={isMeLoading ? '...' : profileName} profilePct={isMeLoading ? 0 : profilePct} />

      {/* 🔹 Scrollable Content */}
      <ScrollView
        style={{ flex: 1, marginTop: 100 + insets.top }}
        contentContainerStyle={{ paddingBottom: 20 + insets.bottom }}>

        {/* Advisor Card */}
        <AdvisorCard navigation={navigation} />

        {/* Image Slider */}
        <ImageSlider />

        {/* Body */}
        <View style={styles.body}>
          {/* Why choose us */}
          <WhyChooseUs />

          {/* Institutions Section */}
          <InstitutionsSection navigation={navigation} />

        {/* Events Section */}
        <EventsSection navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 1, padding: 16 },
});

export default HomeScreen;
