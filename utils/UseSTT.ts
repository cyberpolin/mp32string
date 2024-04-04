import OpenAI from 'openai';
import {useRef} from 'react';
import Config from 'react-native-config';

const {OPENAI_KEY} = Config;

const UseSTT = () => {
  const openai = useRef(new OpenAI({apiKey: OPENAI_KEY}));

  const transcript = async (path: any) => {
    try {
      const transcription = await openai.current.audio.transcriptions.create({
        file: path,
        model: 'whisper-1',
      });
      return transcription;
    } catch (error) {
      console.log('transcript', error);
      return 'something dint work out!';
    }
  };

  return {transcript};
};
export default UseSTT;
