import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, View, Button, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LABELS } from '@/constants/labels';
import { useAudioPlayer } from 'expo-audio';
import { Chip, Divider, IconButton } from 'react-native-paper';
import ViewShot from "react-native-view-shot";
import AppHeader from '@/components/appHeader';
import AppCard from '@/components/appCard';
import WordExampleCard from '@/components/wordExampleCard';

export default function HomeScreen() {
  const [wordOfTheDay, setWordOfTheDay] = useState<any>({});
  const [audioData, setAudioData] = useState<any>({});
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const apiKey: string = process.env.EXPO_WORDNIK_API_KEY || '';

  const viewShotRef = useRef<ViewShot>(null);
  const [snapshotUri, setSnapshotUri] = React.useState<string | null>(null);

  const dateOption = {

  };


  // Only create audio player when we have audio data
  const wordAudio = useAudioPlayer(audioData && audioData?.fileUrl || '', {
    downloadFirst: true
  });

  // fetch word on load
  useEffect(() => {
    if (Object.keys(wordOfTheDay).length !== 0) {
      return;
    }

    fetch(`https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setWordOfTheDay(data);
        // Fetch audio data after word data is set
        return fetch(`https://api.wordnik.com/v4/word.json/${data.word}/audio?useCanonical=false&limit=1&api_key=${apiKey}`);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data?.error) {
          setAudioData(data[0])
        }
      })
      .catch(error => console.error('Error fetching word:', error));
  }, []);

  const getWord = (): string => {
    if (!wordOfTheDay.word) {
      return '';
    }
    return wordOfTheDay?.word.toUpperCase();
  }

  const getWordNote = (): string => {
    return wordOfTheDay.note || '';
  }

  const getDefinitions = (): [] => {
    return wordOfTheDay.definitions || [];
  }

  const getExampleSentences = (): [] => {
    return wordOfTheDay.examples || [];
  }
  
  const getSynonyms = (): [] => {
    return wordOfTheDay.synonyms || [];
  }

  const getAntonyms = (): [] => {
    return wordOfTheDay.antonyms || [];
  }

  const getCurrentDate = (): string => {
    return currentDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const handleAddToWordCollection = async () => {
    if (Platform.OS === "web") {
      return;
    }

    try {
      const uri = await viewShotRef.current?.capture?.();
      console.log(uri)
      setSnapshotUri(uri || null);
    } catch (err) {
      console.warn("Failed to capture view:", err);
    }
  }

  return (
    <ScrollView className="flex-1">
      <AppHeader
        title={LABELS.APP_TITLE}
        description={LABELS.APP_DESCRIPTION}/>
      <View className="flex-1 p-6">
        <AppCard>
          <View className="flex-col items-start pl-6 pt-6 pr-6 mb-2">
          {snapshotUri && (
            <Image
            source={{ uri: snapshotUri }}
            style={{ width: 200, height: 200, marginTop: 20, borderWidth: 1 }}
            />
          )}
          <Text>
            {getCurrentDate()}
          </Text>
          <View>
            <ViewShot ref={viewShotRef}>
              <Text className="text-4xl text-grey-900 font-medium">
              {
                getWord() ? 
                  getWord() :
                  LABELS.NO_WORD_TODAY
              }
            </Text>
            </ViewShot>
            {
              audioData?.fileUrl ? 
              <IconButton 
                size={20}
                icon="volume-high"
                onPress={() => wordAudio.play()}>

              </IconButton> :
              <></>
            }
          </View>
        </View>
        <View 
          className="flex-1 pb-6 pr-6 pl-6">
          <View className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-3">
              {
                getDefinitions().length > 1 ? 
                LABELS.DEFINITIONS :
                LABELS.DEFINITION
              }
            </Text>
            {
              getDefinitions().length > 0 ? 
              getDefinitions().map((definition: any, index: number) => (
                <View className="flex-wrap flex-row">
                  <Chip>{definition.partOfSpeech}</Chip>
                  <Text key={index} className="text-gray-700 mb-2 leading-6 my-2">
                    {definition.text}
                  </Text>
                </View> 
              ))
              :
              <Text className="text-gray-500 italic">{LABELS.NO_DEFINITIONS}</Text>
            }
          </View>
          <Divider />
          <View className="my-4">
            <Text className="text-xl font-semibold text-gray-800 mb-3">
            {
                getExampleSentences().length > 1 ? 
                LABELS.EXAMPLES :
                LABELS.EXAMPLE
              }
            </Text>
            {
              getExampleSentences().length > 0 ? 
              getExampleSentences().map((exampleSentence: any, index: number) => (
                <View className='p-2'>
                  <WordExampleCard key={index} example={exampleSentence.text} />
                </View>
              ))
              :
              <Text className="text-gray-500 italic">{LABELS.NO_EXAMPLES}</Text>
            }
          </View>
          <Divider />  
        </View>
          <View className='p-6'>
            <View>
              <Button title={LABELS.ADD_TO_WORDS} onPress={handleAddToWordCollection}></Button>
            </View>
          </View>
        </AppCard>
      </View>
    </ScrollView>
  );
}


