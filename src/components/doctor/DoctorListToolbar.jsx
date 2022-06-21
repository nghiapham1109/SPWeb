import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import trash2Fill from "@iconify/icons-eva/trash-2-fill";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import BackendAPI from "../../api/HttpClient";
import jwt_decode from "jwt-decode";
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

export default function SymptomListToolbar() {
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);
  const [value, setValue] = useState();
  //
  const getDoctorByAdmin = () => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    const decode = jwt_decode(getToken);
    const IDAdmin = decode.result.IDAdmin;
    BackendAPI.get(`/api/booking/${IDAdmin}`, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        setData(json.data.data);
        // console.log(json.data.data);
        setArrayHolder(json.data.data);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };
  useEffect(() => {
    getDoctorByAdmin();
  }, []);
  //
  let searchFilterFunction = (text) => {
    setValue(text);
    console.log("dasdas", text);
    const newData = arrayHolder.filter((item) => {
      const itemData = `${item.NameDoctor.toUpperCase()}`;
      console.log("Search Disease", itemData);
      const textData = text.toUpperCase();
      // console.log(textData);
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  };
  //
  return (
    <RootStyle>
      <SearchStyle
        placeholder="Search Doctor..."
        startAdornment={
          <InputAdornment position="start">
            <Box
              component={Icon}
              icon={searchFill}
              sx={{ color: "text.disabled" }}
            />
          </InputAdornment>
        }
      />
    </RootStyle>
  );
}
