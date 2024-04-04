/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styled} from 'styled-components/native';
import UseAudio from './utils/UseAudio';
import UseTodo from './utils/UseTodo';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import SoundLine from './components/SoundLine';

function App(): React.JSX.Element {
  const {isRecording, onStartRecord, onStopRecord} = UseAudio('test');

  const {items: todoData, addItem, removeItem} = UseTodo();

  const trancriptionAction = async () => {
    if (isRecording) {
      const text = await onStopRecord();

      if (text !== null) {
        addItem(text);
      }
      return;
    }
    onStartRecord();
  };

  return (
    <SafeAreaView style={{}}>
      <Status />
      <Wrapper colors={['#000000', '#FFFFFF']}>
        <Title>Add a task for the day...</Title>
        <HelpTitle>Just record an audio, we'll type it for you.</HelpTitle>
        <SoundWaveWrapper>
          {['', '', '', '', '', '', '', '', '', ''].map((_, i, arr) => (
            <SoundLine
              key={i}
              index={i}
              total={arr.length}
              isRecording={isRecording}
            />
          ))}
        </SoundWaveWrapper>
        <RecordButton onPress={trancriptionAction}>
          <Icon
            name={isRecording ? 'stop' : 'microphone'}
            color="#FFFFFF"
            size={16}
          />
        </RecordButton>

        <Title>Pending tasks...</Title>
        <Separator />
        {todoData.map((item, index) => (
          <>
            <ItemWrapper key={index}>
              <Label key={index}>· {item}</Label>
              <Icon
                name="close"
                color="#FFFFFF"
                onPress={() => removeItem(index)}
              />
            </ItemWrapper>
          </>
        ))}
      </Wrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

const Status = styled(StatusBar).attrs({
  backgroundColor: '#313C59',
})`
  background-color: #313c59;
`;
const Wrapper = styled(LinearGradient).attrs({
  colors: ['#313C59', '#313C4E80'],
  start: {x: 1, y: 1},
  end: {x: 0.2, y: 0.5},
})`
  display: flex;
  padding: 20px;
  min-height: 100%;
  align-items: center;
`;

const RecordButton = styled.TouchableOpacity`
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
`;

const Label = styled.Text`
  color: #fff;
`;

const Title = styled(Label)`
  font-size: 24px;
  margin-top: 15px;
`;

const HelpTitle = styled(Label)`
  font-size: 14px;
  color: #a3a3a3;
`;

const ItemWrapper = styled(Animated.View).attrs({
  entering: SlideInRight,
  exiting: SlideOutLeft,
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 5px;
  border-bottom-width: 1px;
  border-color: #ffffff20;
`;

const Separator = styled.View`
  border-bottom-width: 1px;
  width: 100%;
  border-color: #ffffff20;
  margin: 20px 0 0 0;
`;

const SoundWaveWrapper = styled.View`
  min-width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


