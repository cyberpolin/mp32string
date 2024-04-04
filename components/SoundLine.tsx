import {useRef} from 'react';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

const SoundLine = ({
  index,
  total,
  isRecording,
}: {
  index: number;
  total: number;
  isRecording: boolean;
}) => {
  const initialValue = 1;
  const animatedValue = useSharedValue(initialValue);

  const pivot = Math.abs(total / 2 - index);
  const top = 5 - pivot;
  const intervalId = useRef<NodeJS.Timeout | undefined>();

  if (isRecording) {
    intervalId.current = setInterval(() => {
      animatedValue.value = withSpring(Math.floor(Math.random() * top * 15));
    }, 250);
  }
  if (!isRecording) {
    clearInterval(intervalId.current);
    animatedValue.value = withSpring(initialValue);
  }

  return (
    <Animated.View
      style={{
        width: 3,
        height: animatedValue,
        backgroundColor: '#fff',
        marginLeft: 2,
        marginRight: 2,
      }}
    />
  );
};

export default SoundLine;
