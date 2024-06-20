// components/Home/Board/components/NotesCard.tsx
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { NotesCardProps } from '../types';
import Swipe from './Swipe';

const { width } = Dimensions.get('window');
const noteWidth = ((2 * width) / 3) - 20;
const contentCharacterLimit = 100; // Adjust the character limit as needed

const NotesCard: React.FC<NotesCardProps> = ({ notes }) => {
  const cardBackground = useThemeColor({}, 'cardBackground');

  const truncateList = (items: string[], limit: number) => {
    let truncatedList = [];
    let characterCount = 0;

    for (let item of items) {
      if (characterCount + item.length <= limit) {
        truncatedList.push(item);
        characterCount += item.length;
      } else {
        break;
      }
    }

    return truncatedList;
  };

  const renderNoteContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      const truncatedContent = truncateList(content, contentCharacterLimit);
      return truncatedContent.map((item, index) => (
        <View key={index} style={styles.noteTextWrapper}>
          {item !== '...' && <ThemedText style={styles.bullet}>✤</ThemedText>}
          <ThemedText style={styles.noteText} numberOfLines={1} ellipsizeMode="tail">
            {item}
          </ThemedText>
        </View>
      ));
    } else {
      return (
        <ThemedText style={styles.noteText} numberOfLines={4} ellipsizeMode="tail">
          {content}
        </ThemedText>
      );
    }
  };

  const pages = notes.map((note, index) => (
    <ThemedView key={index} style={[styles.noteCard, { backgroundColor: cardBackground }]}>
      <ThemedText style={styles.noteTitle}>{note.title}</ThemedText>
      <View style={styles.noteContent}>
        {renderNoteContent(note.content)}
      </View>
    </ThemedView>
  ));

  return (
    <View style={styles.container}>
      <Swipe pages={pages} pageWidth={noteWidth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: noteWidth,
  },
  noteCard: {
    borderRadius: 10,
    height: 160,
    overflow: 'hidden',
    width: '100%',
    padding: 15,
  },
  noteTitle: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-Bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  noteContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  noteTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Add space between list items
  },
  noteText: {
    fontSize: 16,
    fontFamily: 'TimesNewRoman',
    textAlign: 'left',
    flex: 1,
  },
  bullet: {
    fontSize: 16,
    fontFamily: 'TimesNewRoman',
    marginRight: 5,
  },
});

export default NotesCard;
