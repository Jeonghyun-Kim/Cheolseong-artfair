import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import UpIcon from '@material-ui/icons/ArrowUpward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

import './ListScreen.scss';

import ConfigContext from '../../ConfigContext';

import info from '../../info.json';

import useWindowSize from '../useWindowSize';

const ItemList = React.lazy(() => import('../ItemList/ItemList'));

const YEAR_MIN = 2004;
const YEAR_MAX = 2020;

const PRICE_UNIT = 50;
const PRICE_MIN = 0 / PRICE_UNIT;
const PRICE_MAX = 1800 / PRICE_UNIT;

interface Information {
  year: number;
  id: number;
  width: number;
  height: number;
  price: number | string;
}

interface MyConfigInterface {
  yearRange: [number, number];
  priceRange: [number, number];
  onSaleOnly: boolean;
}

const defaultConfig = {
  yearRange: [YEAR_MIN, YEAR_MAX] as [number, number],
  priceRange: [PRICE_MIN, PRICE_MAX] as [number, number],
  onSaleOnly: false,
};

interface MySortInterface {
  yearSort: boolean;
  priceSort: boolean;
  useSort: string;
}

const defaultSortConfig = {
  yearSort: true,
  priceSort: false,
  useSort: 'year',
};

export default function ListScreen() {
  const { idxMap, setIdxMap } = React.useContext(ConfigContext);
  const [storedConfig, setStoredConfig] = React.useState<MyConfigInterface>(defaultConfig);
  const [config, setConfig] = React.useState<MyConfigInterface>(defaultConfig);
  const [
    storedSortConfig,
    setStoredSortConfig,
  ] = React.useState<MySortInterface>(defaultSortConfig);
  const [sortConfig, setSortConfig] = React.useState<MySortInterface>(defaultSortConfig);
  const [filterAnchorEl, setFilterAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = React.useState<null | HTMLElement>(null);

  const [innerWidth, innerHeight] = useWindowSize();
  const history = useHistory();

  React.useEffect(() => {
    const sessionConfig = sessionStorage.getItem('@config');
    const sessionSortConfig = sessionStorage.getItem('@sortConfig');

    if (sessionConfig) {
      setStoredConfig(JSON.parse(sessionConfig));
      setConfig(JSON.parse(sessionConfig));
    }

    if (sessionSortConfig) {
      setStoredSortConfig(JSON.parse(sessionSortConfig));
      setSortConfig(JSON.parse(sessionSortConfig));
    }
  }, []);

  const handleScrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    sessionStorage.setItem('@scrollY', '0');
  };

  const handleSortMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sessionStorage.setItem('@scrollY', '0');
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    sessionStorage.setItem('@sortConfig', JSON.stringify(sortConfig));
    setStoredSortConfig(sortConfig);
    setSortAnchorEl(null);
  };

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sessionStorage.setItem('@scrollY', '0');
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    sessionStorage.setItem('@config', JSON.stringify(config));
    setStoredConfig(config);
    setFilterAnchorEl(null);
  };

  React.useEffect(() => {
    const map: number[] = [];
    info.forEach((item: Information, idx: number) => {
      if (item.year < storedConfig.yearRange[0] || item.year > storedConfig.yearRange[1]) {
        return;
      }
      if (item.price === 'sold out') {
        if (!storedConfig.onSaleOnly) {
          map.push(idx);
        }
        return;
      }
      if (storedConfig.onSaleOnly && (Number(item.price) < storedConfig.priceRange[0] * PRICE_UNIT
        || Number(item.price) > storedConfig.priceRange[1] * PRICE_UNIT)) {
        return;
      }
      map.push(idx);
    });

    const getSign = (value: number) => {
      if (value > 0) {
        return 1;
      }
      if (value === 0) {
        return 0;
      }
      return -1;
    };

    const compareYearUp = (a: number, b: number) => getSign(info[a].year - info[b].year);
    const comparePrice = {
      up: (a: number, b: number) => {
        if (info[a].price === 'sold out') {
          if (info[b].price === 'sold out') {
            return 0;
          }
          return 1;
        }
        if (info[b].price === 'sold out') {
          return -1;
        }
        return getSign(Number(info[a].price) - Number(info[b].price));
      },

      down: (a: number, b: number) => {
        if (info[a].price === 'sold out') {
          if (info[b].price === 'sold out') {
            return 0;
          }
          return 1;
        }
        if (info[b].price === 'sold out') {
          return -1;
        }
        return getSign(Number(info[b].price) - Number(info[a].price));
      },
    };

    switch (storedSortConfig.useSort) {
      case 'year':
        if (!storedSortConfig.yearSort) {
          map.sort(compareYearUp);
        }
        break;
      case 'price':
        if (storedSortConfig.priceSort) {
          map.sort(comparePrice.down);
        } else {
          map.sort(comparePrice.up);
        }
        break;
      default:
        break;
    }

    sessionStorage.setItem('@idxMap', JSON.stringify(map));
    setIdxMap(map);
  }, [storedSortConfig, storedConfig, setIdxMap]);

  const ScrollRestoration = () => {
    React.useEffect(() => {
      const storedScrollY = sessionStorage.getItem('@scrollY');

      if (storedScrollY) {
        window.scroll({ top: JSON.parse(storedScrollY), left: 0 });
      }
    }, []);

    return <></>;
  };

  return (
    <div className="listRoot">
      <Typography id="paitingNumber" className="unselectable">작품 개수: {idxMap.length}개</Typography>
      <div className="listContainer">
        <React.Suspense fallback={<>Loading</>}>
          <ItemList indexMap={idxMap} windowSize={[innerWidth, innerHeight]} />
        </React.Suspense>
        <ScrollRestoration />
      </div>
      <IconButton
        id="backIcon"
        className="fixed"
        onClick={() => history.push('/')}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      {/* Scroll To Top Icon */}
      <IconButton
        id="upIcon"
        onClick={() => handleScrollToTop()}
      >
        <UpIcon fontSize="small" />
      </IconButton>
      {/* Sort Menu Button */}
      {!(JSON.stringify(storedSortConfig) === JSON.stringify(defaultSortConfig)) && (
        <Brightness1Icon fontSize="small" id="sortBadge" />
      )}
      <IconButton
        id="sortIcon"
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={handleSortMenuOpen}
      >
        <div className="iconContainer">
          <FontAwesomeIcon
            icon={faSortAmountDown}
            size={innerWidth < 1000 ? 'xs' : '1x'}
            style={{ margin: innerWidth < 1000 ? '5px' : '10px' }}
          />
          <div className="iconTitle">정렬</div>
        </div>
      </IconButton>
      {/* Sort Menu Popup */}
      <Popover
        id="sort-menu"
        className="unselectable"
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div id="switchContainer">
          <Grid container>
            <Grid item>
              <Radio
                value="year"
                color="primary"
                checked={sortConfig.useSort === 'year'}
                onChange={(e) => setSortConfig({
                  ...sortConfig,
                  useSort: e.target.value,
                  priceSort: defaultSortConfig.priceSort,
                })}
              />
            </Grid>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Typography align="center" variant="body2">연도 순</Typography>
            </Grid>
            <Grid item xs>
              <Switch
                color="primary"
                disabled={!(sortConfig.useSort === 'year')}
                checked={sortConfig.yearSort}
                onChange={(e) => setSortConfig({
                  ...sortConfig,
                  yearSort: e.target.checked,
                })}
              />
            </Grid>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Typography align="center" variant="body2">연도 역순</Typography>
            </Grid>
          </Grid>
        </div>
        <div id="divider" />
        <div id="switchContainer">
          <Grid container>
            <Grid item>
              <Radio
                value="price"
                color="primary"
                checked={sortConfig.useSort === 'price'}
                onChange={(e) => setSortConfig({
                  ...sortConfig,
                  useSort: e.target.value,
                  yearSort: defaultSortConfig.yearSort,
                })}
              />
            </Grid>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Typography align="center" variant="body2">가격 순</Typography>
            </Grid>
            <Grid item xs>
              <Switch
                color="primary"
                disabled={!(sortConfig.useSort === 'price')}
                checked={sortConfig.priceSort}
                onChange={(e) => setSortConfig({
                  ...sortConfig,
                  priceSort: e.target.checked,
                })}
              />
            </Grid>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Typography align="center" variant="body2">가격 역순</Typography>
            </Grid>
          </Grid>
        </div>
      </Popover>
      {/* Filter Menu Button */}
      {!(JSON.stringify(storedConfig.yearRange) === JSON.stringify(defaultConfig.yearRange)
        && !storedConfig.onSaleOnly) && (
        <Brightness1Icon fontSize="small" id="filterBadge" />
      )}
      <IconButton
        id="filterIcon"
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleFilterMenuOpen}
      >
        <div className="iconContainer">
          <FontAwesomeIcon
            icon={faFilter}
            size={innerWidth < 1000 ? 'xs' : '1x'}
            style={{ margin: innerWidth < 1000 ? '5px' : '10px' }}
          />
          <div className="iconTitle">검색</div>
        </div>
      </IconButton>
      {/* Filter Menu Popup */}
      <Popover
        id="filter-menu"
        className="unselectable"
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div id="sliderContainer">
          <Typography variant="body2">연도</Typography>
          <Slider
            value={config.yearRange}
            min={YEAR_MIN}
            max={YEAR_MAX}
            onChange={(_e, newValue) => setConfig({
              ...config,
              yearRange: newValue as [number, number],
            })}
            valueLabelDisplay="auto"
            aria-labelledby="yearRangeSlider"
          />
          <Grid container>
            <Grid item>
              {config.yearRange[0]}년
            </Grid>
            <Grid item xs>
              <Typography align="center">~</Typography>
            </Grid>
            <Grid item>
              {config.yearRange[1]}년
            </Grid>
          </Grid>
        </div>
        <div>
          <div id="divider" />
        </div>
        <Grid container id="checkBoxContainer">
          <Grid item xs container direction="column" justify="center">
            <Typography variant="h6" id="onSaleText">판매 중인 작품만</Typography>
          </Grid>
          <Grid item>
            <Checkbox
              checked={config.onSaleOnly}
              color="primary"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({
                ...config,
                onSaleOnly: e.target.checked,
              })}
            />
          </Grid>
        </Grid>
        <div id="divider" />
        <div id="sliderContainer">
          <Typography variant="body2">가격</Typography>
          <Slider
            value={config.priceRange}
            min={PRICE_MIN}
            max={PRICE_MAX}
            scale={(x) => PRICE_UNIT * x}
            disabled={!config.onSaleOnly}
            onChange={(_e, newValue) => setConfig({
              ...config,
              priceRange: newValue as [number, number],
            })}
            valueLabelDisplay="auto"
            aria-labelledby="priceRangeSlider"
          />
          <Grid container>
            <Grid item>
              {config.priceRange[0] ? `${config.priceRange[0] * PRICE_UNIT}만원` : '0원'}
            </Grid>
            <Grid item xs>
              <Typography align="center">~</Typography>
            </Grid>
            <Grid item>
              {config.priceRange[1] * 50}만원
            </Grid>
          </Grid>
        </div>
      </Popover>
    </div>
  );
}
