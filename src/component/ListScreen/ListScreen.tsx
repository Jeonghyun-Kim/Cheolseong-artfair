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
import useWindowSize from '../useWindowSize';

const ItemList = React.lazy(() => import('../ItemList/ItemList'));

export default function ListScreen() {
  const {
    yearRange,
    setYearRange,
    priceRange,
    setPriceRange,
  } = React.useContext(ConfigContext);
  const [tpYearRange, setTpYearRange] = React.useState<[number, number]>(yearRange);
  const [tpPriceRange, setTpPriceRange] = React.useState<[number, number]>(priceRange);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [indexMap, setIndexMap] = React.useState<number[]>(
    (new Array(200)).fill(undefined).map((_, idx) => idx),
  );

  const [innerWidth] = useWindowSize();

  const handleMenuClose = () => {
    setAnchorEl(null);
    sessionStorage.setItem('@yearMin', String(tpYearRange[0]));
    sessionStorage.setItem('@yearMax', String(tpYearRange[1]));
    sessionStorage.setItem('@priceMin', String(tpPriceRange[0]));
    sessionStorage.setItem('@priceMax', String(tpPriceRange[1]));
    setYearRange(tpYearRange);
    setPriceRange(tpPriceRange);
  };

  return (
    <div className="listRoot">
      <div className="container">
        <React.Suspense fallback={<>Loading</>}>
          <ItemList indexMap={indexMap} />
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
            value={tpYearRange}
            min={2004}
            max={2020}
            onChange={(_e, newValue) => {
              setTpYearRange(newValue as [number, number]);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="yearRangeSlider"
            getAriaValueText={(value) => `${value}년`}
          />
          <Grid container>
            <Grid item>
              {tpYearRange[0]}년
            </Grid>
            <Grid item xs>
              <Typography align="center">~</Typography>
            </Grid>
            <Grid item>
              {tpYearRange[1]}년
            </Grid>
          </Grid>
        </div>
        <div id="sliderContainer">
          <Typography variant="body2">가격</Typography>
          <Slider
            value={tpPriceRange}
            min={0}
            max={33}
            scale={(x) => 50 * x}
            onChange={(_e, newValue) => {
              setTpPriceRange(newValue as [number, number]);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="priceRangeSlider"
            getAriaValueText={(value) => `${value}만원`}
          />
          <Grid container>
            <Grid item>
              {tpPriceRange[0] ? `${tpPriceRange[0] * 50}만원` : '0원'}
            </Grid>
            <Grid item xs>
              <Typography align="center">~</Typography>
            </Grid>
            <Grid item>
              {tpPriceRange[1] * 50}만원
            </Grid>
          </Grid>
        </div>
      </Popover>
    </div>
  );
}
