import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MusicCard from './components/MusicCard';
import NotesCard from './components/NotesCard';
import LetterCard from './components/LetterCard';
import dummyData from './dummy.json';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BoardProps } from './types';
import Divider from '@/assets/icons/Divider';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

const Board: React.FC<BoardProps> = () => {
  const { track, notes, letter } = dummyData;
  const colorScheme = useColorScheme();
  const dividerColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <ThemedView style={styles.container}>
      <MusicCard track={track} />
      <ThemedView style={styles.bottomRow}>
        <NotesCard notes={notes} />
        <LetterCard />
      </ThemedView>
      <Divider size={width - 40} color={dividerColor} />
      
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 800,
  },
  bottomRow: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 800,
  },
});

export default Board;
