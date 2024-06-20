// components/Home/Board/components/MusicCard.tsx
import React from 'react';
import { StyleSheet, View, Image, Pressable, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Queue from '@/assets/icons/Queue';
import Swipe from './Swipe';
import { MusicCardProps } from '../types';

const { width } = Dimensions.get('window');

const MusicCard: React.FC<MusicCardProps> = ({ track }) => {
  const iconColor = '#fff';
  const pageWidth = width - 20;

  const FirstPage = () => (
    <View style={[styles.pageContent, { width: pageWidth }]}>
      <Image source={{ uri: track.albumArt }} style={styles.albumArt} />
      <View style={styles.overlay} />
      <Pressable style={styles.addButton}>
        <ThemedText style={styles.addButtonText}>Add to Queue</ThemedText>
        <Queue size={24} color={iconColor} style={styles.icon} />
      </Pressable>
      <View style={styles.trackInfoContainer}>
        <ThemedText style={styles.trackTitle}>{track.title}</ThemedText>
        <ThemedText style={styles.trackArtist}>{track.artist}</ThemedText>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${track.progress}%` }]} />
        </View>
      </View>
    </View>
  );

  const SecondPage = () => (
    <View style={[styles.pageContent, { width: pageWidth }]}>
      <View style={styles.overlay} />
    </View>
  );

  return (
    <ThemedView style={styles.card}>
      <Swipe pages={[<FirstPage key="first" />, <SecondPage key="second" />]} pageWidth={pageWidth} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  pageContent: {
    height: '100%',
    position: 'relative',
  },
  albumArt: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  icon: {
    marginLeft: 5,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  trackInfoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  trackTitle: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  trackArtist: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#777',
    borderRadius: 2,
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
});

export default MusicCard;
