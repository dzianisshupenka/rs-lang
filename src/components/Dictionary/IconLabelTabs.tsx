import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 500,
  },
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<MenuBookIcon />} label="Изучаемые слова" />
        <Tab icon={<FitnessCenterIcon />} label="СЛОЖНЫЕ СЛОВА" />
        <Tab icon={<DeleteIcon />} label="УДАЛЕННЫЕ СЛОВА" />
      </Tabs>
    </Paper>
  );
}
