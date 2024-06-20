import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import dummyData from './dummy.json';
import { TimelineItemProps } from './types';
import TimelineItem from './components/TimelineItem';

const Timeline: React.FC = () => {
  const items: TimelineItemProps[] = dummyData.items.map(item => ({
    ...item,
    type: item.type as 'picture' | 'video' | 'caption'
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatTime = (date: Date) => {
    const hours = Math.round(date.getHours() + date.getMinutes() / 60);
    return `${hours.toString().padStart(2, '0')}:00h`;
  };

  const formatHeader = (date: Date) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    const dayDifference = (startOfToday.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

    if (date >= startOfToday) return 'Today';
    if (date >= startOfYesterday) return 'Yesterday';
    if (dayDifference < 7) return date.toLocaleDateString(undefined, { weekday: 'long' });
    return date.toLocaleDateString();
  };

  const getNextSignificantItem = (currentDate: Date, items: TimelineItemProps[]): TimelineItemProps | undefined => {
    const threeHoursAgo = new Date(currentDate.getTime() - 3 * 60 * 60 * 1000);
    return items.find(item => new Date(item.date) < threeHoursAgo);
  };

  const renderItems = () => {
    let lastHeader = '';
    let currentDate = new Date(items[0]?.date);
    const significantItems: TimelineItemProps[] = [];

    while (currentDate) {
      const nextSignificantItem = getNextSignificantItem(currentDate, items);
      if (!nextSignificantItem) break;
      significantItems.push(nextSignificantItem);
      currentDate = new Date(nextSignificantItem.date);
    }

    return items.map((item, index) => {
      const itemDate = new Date(item.date);
      const formattedTime = formatTime(itemDate);
      const header = formatHeader(itemDate);
      const showHeader = header !== lastHeader;
      const showTime = significantItems.includes(item) && !showHeader;
      lastHeader = header;

      return (
        <React.Fragment key={index}>
          {showHeader && <ThemedText style={styles.header}>{header}</ThemedText>}
          {showTime && <ThemedText style={styles.subheader}>{formattedTime}</ThemedText>}
          <TimelineItem item={item} />
        </React.Fragment>
      );
    });
  };

  return (
    <ThemedView style={styles.container}>
      {renderItems()}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    lineHeight: 34,
    fontSize: 32,
    fontFamily: 'TimesNewRoman-Bold',
    marginVertical: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
});

export default Timeline;
