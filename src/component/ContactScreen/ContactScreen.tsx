import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';
// const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface ContactProps extends RouteComponentProps<{ idx: string }> {}

export default function ContactScreen({ match }: ContactProps) {
  // const [size, setSize] = React.useState<number[]>([]);

  // React.useEffect(() => {
  //   setSmall(innerWidth < 600);
  // }, [innerWidth]);

  return (
    <div className="App">
      <>{match.params.idx}</>
    </div>
  );
}
