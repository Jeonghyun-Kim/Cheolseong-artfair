import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useTranslation } from 'react-i18next';

import './ContactScreen.scss';

import info from '../../info.json';
import DEFINES from '../../defines';

import Logo from '../Logo/Logo';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface ContactProps extends RouteComponentProps<{ idx: string }> {}

export default function ContactScreen({ match }: ContactProps) {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [subscription, setSubscription] = React.useState<boolean>(false);
  const [agreed, setAgreed] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<string>('');

  const { t } = useTranslation();

  const history = useHistory();

  const idx = Number(match.params.idx);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.preventDefault();

    if (name && email && content) {
      if (!agreed) {
        setAlert(t('alert.privacy_policy_required'));
        return;
      }
      if (!EMAIL_REGEX.test(email)) {
        setAlert(t('alert.inappropriate_email'));
        return;
      }
      if (name.length < 2) {
        setAlert(t('alert.name_length_larger_than_2'));
        return;
      }
      if (content.length < 3) {
        setAlert(t('alert.content_length_larger_than_3'));
        return;
      }
      if (content.length > 300) {
        setAlert(t('alert.content_length_smaller_than_300'));
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
          setAlert(t('alert.successfully_registered'));
        } else {
          setAlert(t('alert.internal_server_error'));
        }
      }).catch(() => setAlert(t('alert.check_network_status')));
    } else {
      setAlert(t('alert.fill_all_required'));
    }
  };

  // React.useEffect(() => {
  //   fetch(`${DEFINES.API_URL}/hitcount/contact/${idx}`);
  // }, [idx]);

  return (
    <div className="App contactRoot background">
      <Logo />
      <div className="contactContainer">
        <Paper variant="elevation" className="contactPaper">
          <IconButton
            id="contactClose"
            onClick={() => history.goBack()}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
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
                    {info[idx].price === 'sold out' ? 'SOLD OUT' : `${(Number(info[idx].price) * 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${t('currency')}`}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <div id="divider" />
            <div className="textInput">
              <div>{t('name')} *</div>
              <TextField
                required
                name="name"
                placeholder={t('required')}
                variant="standard"
                color="primary"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="textInput">
              <div>{t('email')} *</div>
              <TextField
                required
                name="email"
                type="email"
                placeholder={t('required')}
                variant="standard"
                color="primary"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="textInput">
              <div>{t('phone')}</div>
              <TextField
                type="tel"
                name="tel"
                placeholder={`(${t('ex')})`}
                variant="standard"
                color="primary"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputProps={{ maxLength: 13 }}
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
              <span>{t('contact.privacy_policy_agreement')}</span>
            </div>
            <div className="checkbox unselectable">
              <Checkbox
                color="default"
                checked={subscription}
                onChange={(e) => {
                  setSubscription(e.target.checked);
                }}
              />
              <span>{t('contact.keep_me_updated')}</span>
            </div>
            <div className="seeMoreButton">
              <a href={`${DEFINES.API_URL}/privacy_agreement.pdf`} rel="noopener noreferrer" target="_blank">
                <span>{t('privacy_policy')}</span>
              </a>
            </div>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6} md={7} id="contentSection">
            <Typography variant="h6" id="helperText">
              {t('contact.title1')}
              <br />
              {t('contact.title2')}
            </Typography>
            <Grid item xs>
              <form>
                <div className="content">
                  <TextField
                    required
                    placeholder={t('contact.placeholder')}
                    variant="outlined"
                    color="primary"
                    multiline
                    fullWidth
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    inputProps={{ maxLength: 300 }}
                  />
                </div>
                <div>
                  <div id="alert">
                    <span className="red">
                      {alert}
                    </span>
                    <span className="length" style={{ color: content.length >= 300 ? '#e40d0d' : 'black' }}>
                      {content.length}/300
                    </span>
                  </div>
                  <div className="submit">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      {t('submit')}
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
