import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

import './ContactScreen.scss';

import info from '../../info.json';
import DEFINES from '../../defines';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;

interface ContactProps extends RouteComponentProps<{ idx: string }> {}

export default function ContactScreen({ match }: ContactProps) {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [subscription, setSubscription] = React.useState<boolean>(true);
  const [agreed, setAgreed] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<string>('');

  const history = useHistory();

  const idx = Number(match.params.idx);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.preventDefault();

    if (name && email && content) {
      if (!agreed) {
        setAlert('개인정보의 수집 및 활용 동의는 필수입니다.');
        return;
      }
      if (!EMAIL_REGEX.test(email)) {
        setAlert('이메일 주소가 올바르지 않습니다.');
        return;
      }
      if (!PHONE_REGEX.test(phone)) {
        setAlert('휴대폰 번호가 올바르지 않습니다.');
        return;
      }
      if (name.length < 2) {
        setAlert('이름은 2글자 이상 입력해주세요.');
        return;
      }
      if (content.length < 3) {
        setAlert('내용은 3글자 이상 입력해주세요.');
        return;
      }
      if (content.length > 300) {
        setAlert('내용은 300글자 이하로 입력해주세요.');
        return;
      }
      if (phone.length > 10) {
        setAlert('휴대폰 번호가 올바르지 않습니다.');
        return;
      }
      fetch(`${DEFINES.API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          index: match.params.idx, name, email, phone, content, subscription,
        }),
      }).then(async (response) => {
        if (response.ok) {
          setAlert('성공적으로 등록되었습니다. 입력하신 이메일/휴대전화로 연락 드릴게요.');
        } else {
          setAlert('데이터베이스 에러. 전화 문의 바랍니다. 010-6317-1498');
        }
      }).catch(() => setAlert('네트워크 연결 상태를 확인하세요.'));
    } else {
      setAlert('필수 입력칸을 모두 채워주세요!');
    }
  };

  return (
    <div className="App contactRoot background">
      <IconButton
        id="backIcon"
        onClick={() => history.goBack()}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <div className="contactContainer">
        <Paper variant="elevation" className="contactPaper">
          <Grid item xs={12} sm={6} md={5} id="infoSection">
            <Grid container className="imageBox">
              <Grid item xs={5} className="image">
                <img
                  alt="paintingImage"
                  src={`${DEFINES.STORAGE_URL_XS}/${info[idx].year}_${info[idx].id}.jpg`}
                />
              </Grid>
              <Grid item xs={7} className="title">
                <Typography variant="h5">Decorum</Typography>
                <Typography variant="body1">{info[idx].year} - {info[idx].id}</Typography>
                <div className="caption">
                  <Typography variant="body2">{info[idx].width}x{info[idx].height}cm</Typography>
                  <Typography variant="body2">
                    {info[idx].price === 'sold out' ? 'SOLD OUT' : `${info[idx].price}만원`}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <div id="divider" />
            <div className="textInput">
              <div>이름 *</div>
              <TextField
                required
                name="name"
                placeholder="필수"
                variant="standard"
                color="primary"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="textInput">
              <div>이메일 *</div>
              <TextField
                required
                name="email"
                type="email"
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
                type="tel"
                placeholder="(예: 01012345678)"
                variant="standard"
                color="primary"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="checkbox unselectable">
              <Checkbox
                required
                color="default"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                }}
              />
              <span>개인정보의 수집 및 활용 동의 (필수)</span>
            </div>
            <div className="checkbox unselectable">
              <Checkbox
                color="default"
                checked={subscription}
                onChange={(e) => {
                  setSubscription(e.target.checked);
                }}
              />
              <span>onDisplay의 다른 전시 소식을 받아볼래요.(선택)</span>
            </div>
            <div className="seeMoreButton">
              <a href={`${DEFINES.API_URL}/privacy_agreement.pdf`} rel="noopener noreferrer" target="_blank">
                <span>자세히 보기</span>
              </a>
            </div>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6} md={7} id="contentSection">
            <Typography variant="h6" id="helperText">
              이 작품에 관심이 있으신가요?
              <br />
              작가님께 문의를 남겨주세요. *
            </Typography>
            <Grid item xs>
              <form>
                <div className="content">
                  <TextField
                    required
                    placeholder="안녕하세요, 작품 구입에 관심이 있어요."
                    variant="outlined"
                    color="primary"
                    multiline
                    fullWidth
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div>
                  <div id="alert">
                    <span className="red">
                      {alert}
                    </span>
                    <span className="length" style={{ color: content.length > 300 ? '#e40d0d' : 'black' }}>
                      {content.length}/300
                    </span>
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
                </div>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}
