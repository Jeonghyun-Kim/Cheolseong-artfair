import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './ContactScreen.scss';

// const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';
// const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const API_URL = 'https://api.airygall.com';

interface ContactProps extends RouteComponentProps<{ idx: string }> {}

export default function ContactScreen({ match }: ContactProps) {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [alert, setAlert] = React.useState<string>('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.preventDefault();
    // TODO: validation

    if (name && email && content) {
      fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          index: match.params.idx, name, email, phone, content,
        }),
      }).then(async (response) => {
        if (response.ok) {
          setAlert('성공적으로 등록되었습니다. 입력하신 이메일/휴대전화로 연락 드릴게요.');
        } else {
          setAlert('에러에러');
        }
      }).catch(() => setAlert('네트워크 연결 상태를 확인하세요.'))
        .finally(() => setTimeout(() => setAlert(''), 3000));
    } else {
      setAlert('필수 입력칸을 모두 채워주세요!');
      setTimeout(() => setAlert(''), 3000);
    }
  };

  // React.useEffect(() => {
  //   setSmall(innerWidth < 600);
  // }, [innerWidth]);

  return (
    <div className="App">
      <div className="contactContainer">
        <Paper variant="elevation" className="contactPaper">
          <form>
            <div>
              <TextField
                label="이름"
                variant="standard"
                color="primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="이메일"
                variant="standard"
                color="primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="휴대전화"
                variant="standard"
                color="primary"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="내용"
                variant="standard"
                color="primary"
                multiline
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                제출
              </Button>
            </div>
          </form>
          <div>
            {alert}
          </div>
        </Paper>
      </div>
    </div>
  );
}
