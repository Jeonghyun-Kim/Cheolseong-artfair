import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import SortIcon from '@material-ui/icons/Sort';
import UpIcon from '@material-ui/icons/ArrowUpward';
// import SearchIcon from '@material-ui/icons/Search';

import './ListScreen.scss';

import ConfigContext from '../../ConfigContext';

import info from '../../info.json';

const ItemList = React.lazy(() => import('../ItemList/ItemList'));

interface Information {
  year: number;
  id: number;
  size: string;
  price: number | string;
}

interface MyConfigInterface {
  yearRange: [number, number];
  priceRange: [number, number];
  onSaleOnly: boolean;
}

const defaultConfig = {
  yearRange: [2004, 2020] as [number, number],
  priceRange: [0, 33] as [number, number],
  onSaleOnly: false,
};

export default function ListScreen() {
  const { idxMap, setIdxMap } = React.useContext(ConfigContext);
  const [yearRange, setYearRange] = React.useState<[number, number]>([2004, 2020]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 33]);
  const [onSaleOnly, setOnSaleOnly] = React.useState<boolean>(false);
  const [config, setConfig] = React.useState<MyConfigInterface>(defaultConfig);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const storedYearRange = sessionStorage.getItem('@yearRange');
    const storedPriceRange = sessionStorage.getItem('@priceRange');
    const storedOnSaleOnly = sessionStorage.getItem('@onSaleOnly');
    if (storedYearRange && storedPriceRange && storedOnSaleOnly) {
      setYearRange(JSON.parse(storedYearRange));
      setPriceRange(JSON.parse(storedPriceRange));
      setOnSaleOnly(JSON.parse(storedOnSaleOnly));
      setConfig({
        yearRange: JSON.parse(storedYearRange),
        priceRange: JSON.parse(storedPriceRange),
        onSaleOnly: JSON.parse(storedOnSaleOnly),
      });
    }
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
    sessionStorage.setItem('@yearRange', JSON.stringify(config.yearRange));
    sessionStorage.setItem('@priceRange', JSON.stringify(config.priceRange));
    sessionStorage.setItem('@onSaleOnly', JSON.stringify(config.onSaleOnly));
    setYearRange(config.yearRange);
    setPriceRange(config.priceRange);
    setOnSaleOnly(config.onSaleOnly);

    const map: number[] = [];
    info.forEach((item: Information, idx: number) => {
      if (item.year < config.yearRange[0] || item.year > config.yearRange[1]) {
        return;
      }
      if (item.price === 'sold out') {
        if (!config.onSaleOnly) {
          map.push(idx);
        }
        return;
      }
      if (Number(item.price) < config.priceRange[0] * 50
        || Number(item.price) > config.priceRange[1] * 50) {
        return;
      }
      map.push(idx);
    });

    sessionStorage.setItem('@idxMap', JSON.stringify(map));
    setIdxMap(map);
  };

  const handleScrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="listRoot">
      <div className="listContainer">
        <React.Suspense fallback={<>Loading</>}>
          <ItemList indexMap={idxMap} />
        </React.Suspense>
      </div>
      {/* Scroll To Top Icon */}
      <IconButton
        id="upIcon"
        onClick={() => handleScrollToTop()}
      >
        <UpIcon fontSize="large" />
      </IconButton>
      {/* Filter Menu Button */}
      {!(JSON.stringify(yearRange) === '[2004,2020]' && JSON.stringify(priceRange) === '[0,33]' && !onSaleOnly) && (
        <Brightness1Icon fontSize="small" id="badge" />
      )}
      <IconButton
        id="sortIcon"
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <div className="iconContainer">
          <SortIcon fontSize="large" />
          <div className="iconTitle">Filter</div>
        </div>
      </IconButton>
      {/* Filter Menu Popup */}
      <Popover
        id="sort-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <div id="sliderContainer">
          <Typography variant="body2">연도</Typography>
          <Slider
            value={config.yearRange}
            min={2004}
            max={2020}
            onChange={(_e, newValue) => setConfig({
              ...config,
              yearRange: newValue as [number, number],
            })}
            valueLabelDisplay="auto"
            aria-labelledby="yearRangeSlider"
            getAriaValueText={(value) => `${value}년`}
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
        <div id="divider" />
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
            min={0}
            max={33}
            scale={(x) => 50 * x}
            onChange={(_e, newValue) => setConfig({
              ...config,
              priceRange: newValue as [number, number],
            })}
            valueLabelDisplay="auto"
            aria-labelledby="priceRangeSlider"
            getAriaValueText={(value) => `${value}만원`}
          />
          <Grid container>
            <Grid item>
              {config.priceRange[0] ? `${config.priceRange[0] * 50}만원` : '0원'}
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
