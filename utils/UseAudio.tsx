import {useRef, useState} from 'react';
import {Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import UseSTT from './UseSTT';
import Config from 'react-native-config';

const {OPENAI_KEY} = Config;

const UseAudio = (name?: string) => {
  const [text, setText] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const timestamp = new Date().getTime();

  const audio = useRef(new AudioRecorderPlayer());
  const {transcript} = UseSTT();

  const fileName =
    Platform.OS === 'ios'
      ? `${name || timestamp}.m4a`
      : `${name || timestamp}.mp3`;
  const path =
    Platform.OS === 'ios'
      ? `${fileName}`
      : RNFetchBlob.fs.dirs.CacheDir + `${fileName}`;
  audio.current.addRecordBackListener(e => {
    console.log('record-back', e);
  });

  const onStartRecord = async () => {
    try {
      const result = await audio.current.startRecorder(path);
      setIsRecording(true);

      return result;
    } catch (error) {
      console.log('onStartRecord', error);
    }
  };

  const onStopRecord = async () => {
    try {
      await audio.current.stopRecorder();
      setIsRecording(false);
      audio.current.removeRecordBackListener();
      const text = await fetchTranscription();
      return text.text;
    } catch (error) {
      console.log('onStopRecord', error);
      return 'There was an error';
    } finally {
      setIsRecording(false);
    }
  };
  const fetchTranscription = async () => {
    try {
      const result = await audio.current.startPlayer(path);
      console.log('result', result);

      const data = new FormData();
      data.append('name', 'transcript');
      data.append('file', {
        uri: result.replace('File://', ''),
        type: 'audio/m4a',
        name: fileName,
      });
      data.append('model', 'whisper-1');

      console.log('body', data);

      const res = await fetch(
        'https://api.openai.com/v1/audio/transcriptions',
        {
          method: 'post',
          body: data,
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`,
            'Content-Type': 'multipart/form-data; ',
          },
        },
      );
      console.log('res', res);
      const responseText = await res.json();
      console.log('responseText', responseText);
      return responseText;
    } catch (error) {
      console.log('fetchTranscription', error);
    }
  };

  return {
    isRecording,
    onStartRecord,
    onStopRecord,
  };
};

export default UseAudio;
