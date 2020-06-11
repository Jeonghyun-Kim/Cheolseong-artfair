import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import SortIcon from '@material-ui/icons/Sort';
// import SearchIcon from '@material-ui/icons/Search';

import './ListScreen.scss';

import ConfigContext from '../../ConfigContext';

const ItemList = React.lazy(() => import('../ItemList/ItemList'));

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
  const [onSaleOnly, setOnSaleOnly] = React.useState<boolean>(
    Boolean(sessionStorage.getItem('@onSaleOnly')),
  );
  const [config, setConfig] = React.useState<MyConfigInterface>(defaultConfig);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const storedYearRange = sessionStorage.getItem('@yearRange');
    const storedPriceRange = sessionStorage.getItem('@priceRange');
    const storedOnSaleOnly = sessionStorage.getItem('@onSaleOnly');
    if (storedYearRange && storedPriceRange) {
      setYearRange(JSON.parse(storedYearRange));
      setPriceRange(JSON.parse(storedPriceRange));
      setOnSaleOnly(Boolean(storedOnSaleOnly));
      setConfig({
        yearRange: JSON.parse(storedYearRange),
        priceRange: JSON.parse(storedPriceRange),
        onSaleOnly: Boolean(storedOnSaleOnly),
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
  };

  return (
    <div className="listRoot">
      <div className="listContainer">
        <React.Suspense fallback={<>Loading</>}>
          <ItemList indexMap={idxMap} />
        </React.Suspense>
      </div>
      {!(JSON.stringify(yearRange) === '[2004,2020]' && JSON.stringify(priceRange) === '[0,33]') && (
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
            onChange={(_e, newValue) => {
              setConfig({
                yearRange: newValue as [number, number],
                priceRange: config.priceRange,
                onSaleOnly: config.onSaleOnly,
              });
            }}
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
        <div id="divider" />
        <div id="sliderContainer">
          <Typography variant="body2">가격</Typography>
          <Slider
            value={config.priceRange}
            min={0}
            max={33}
            scale={(x) => 50 * x}
            onChange={(_e, newValue) => {
              setConfig({
                yearRange: config.yearRange,
                priceRange: newValue as [number, number],
                onSaleOnly: config.onSaleOnly,
              });
            }}
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
