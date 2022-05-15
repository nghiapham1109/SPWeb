import PropTypes from "prop-types";
import React, {useState} from "react";
import { makeStyles, useTheme} from "@material-ui/core/styles";
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { IconButton} from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LastPageIcon from '@mui/icons-material/LastPage';


const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    inputPage: {
        width: 37,
        marginLeft: 6,
        // color: '#2546FF',
        fontWeight: 400,
    },
}));


function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[1-9]/, /[1-9]/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};


export default function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange} = props;

    const MAX_VAL = Math.ceil(count / rowsPerPage);
    const withValueCap = (inputObj) => {
        let  {value}  = inputObj;
        return (value !== '0' && value <= MAX_VAL) ?  true : false;
      };
    let [inputPage, setInputPage] = useState(page+1);

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
        setInputPage(1);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page-1);
        setInputPage(page);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
        setInputPage(page + 2);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage)-1));
        setInputPage(Math.ceil(count / rowsPerPage));
    };
    const handleChangePageNumber = (event) => {
        var number = event.target.value;
        if(number > 0){
            setInputPage(number);
            onPageChange(event, number-1);
        }else {
            setInputPage();
        }
    };
    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
                title = "First Page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
                title = "Previous Page"
            >
                {theme.direction === "rtl" ? (
                <KeyboardArrowRightIcon />
                ) : (
                <KeyboardArrowLeftIcon />
                )}
            </IconButton>
            Page <NumberFormat 
            allowNegative ={false}
            displayType = 'input'
            onChange= {(event) => handleChangePageNumber(event)}
            className = {classes.inputPage}
            value = {inputPage}
            decimalScale = {0}
            isAllowed={withValueCap} 
            /> / {Math.ceil(count / rowsPerPage)}
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
                title = "Next Page"
            >
                {theme.direction === "rtl" ? (
                <KeyboardArrowLeftIcon />
                ) : (
                <KeyboardArrowRightIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
                title = "Last Page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
