import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import './ContactScreen.scss';

import info from '../../info.json';
import DEFINES from '../../defines';

// const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const API_URL = 'https://api.airygall.com';

interface ContactProps extends RouteComponentProps<{ idx: string }> {}

export default function ContactScreen({ match }: ContactProps) {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [alert, setAlert] = React.useState<string>('');

  const history = useHistory();

  const idx = Number(match.params.idx);

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
          // TODO:
          setAlert('에러에러');
        }
      }).catch(() => setAlert('네트워크 연결 상태를 확인하세요.'));
      // .finally(() => setTimeout(() => setAlert(''), 3000));
    } else {
      setAlert('필수 입력칸을 모두 채워주세요!');
      // setTimeout(() => setAlert(''), 3000);
    }
  };

  // React.useEffect(() => {
  //   setSmall(innerWidth < 600);
  // }, [innerWidth]);

  return (
    <div className="App contactRoot">
      <IconButton
        id="backIcon"
        className="fixed"
        onClick={() => history.goBack()}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <div className="contactContainer">
        <Paper variant="elevation" className="contactPaper">
          <Grid item xs={12} sm={6} md={5} id="infoSection">
            <Grid container>
              <Grid item xs={5} className="image">
                <img
                  alt="paintingImage"
                  src={`${DEFINES.STORAGE_URL_SM}/${info[idx].year}_${info[idx].id}.jpg`}
                />
              </Grid>
              <Grid item xs={7} className="title">
                <Typography variant="h5">Decorum</Typography>
                <Typography variant="body1">{info[idx].year} - {info[idx].id}</Typography>
              </Grid>
            </Grid>
            <div id="divider" />
            <div className="textInput">
              <div>이름</div>
              <TextField
                placeholder="필수"
                variant="standard"
                color="primary"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="textInput">
              <div>이메일</div>
              <TextField
                placeholder="필수"
                variant="standard"
                color="primary"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="textInput">
              <div>휴대전화</div>
              <TextField
                placeholder="선택"
                variant="standard"
                color="primary"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={7} id="contentSection">
            <Typography variant="h6" id="helperText">
              이 작품에 관심이 있으신가요?
              <br />
              작가님께 문의를 남겨주세요.
            </Typography>
            <form>
              <div className="content">
                <TextField
                  label="내용"
                  variant="outlined"
                  color="primary"
                  multiline
                  fullWidth
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div id="alert">
                {alert}
              </div>
              <div className="submit">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  제출
                </Button>
              </div>
            </form>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}
