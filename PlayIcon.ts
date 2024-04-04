import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg viewBox="0 0 512 512" width="1em" height="1em" {...props}>
      <Path d="M464 256a208 208 0 10-416 0 208 208 0 10416 0zM0 256a256 256 0 11512 0 256 256 0 11-512 0zm188.3-108.9c7.6-4.2 16.8-4.1 24.3.5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3.5S176 352.9 176 344.2V168c0-8.7 4.7-16.7 12.3-20.9z" />
    </Svg>
  );
}

const PlayIcon = React.memo(SVG);
export default PlayIcon;