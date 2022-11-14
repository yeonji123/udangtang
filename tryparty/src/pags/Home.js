
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import axios from 'axios';
import noData from '../img/NoData.png';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));



const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {

    (async () => {
      try {
        const res = await axios.post("http://192.168.2.65:5000/readRoom",
          {
            id: sessionStorage.getItem("id")
          });

        console.log(res.data)
        setData(res.data);
      } catch (error) {
        console.log(error)
      }
    })();

  }, [])




  const testonclick = idx => {
    console.log(idx);
    window.location.href = '/Sekes/' + idx;
  }





  return (
    //responsive 테이블은 반응 형으로 만들어 줌
    <Box width="100%" display="flex" flexDirection="column" m="20px">
      <Table responsive="lg">
        <thead>
          <tr>
            <td>
              <h2>HOME</h2>
            </td>
            <td bg="right">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>

            </td>
            <td> <Button variant="outline-secondary">Search</Button></td>
          </tr>
          <tr>
            <th>번호</th>
            <th>방이름</th>
            <th>관리자 명</th>
            <th>인원</th>
          </tr>
        </thead>


        <tbody>
          {
            data && data.map((e, idx) =>
              <tr onClick={() => testonclick(e.roomNum)}>
                <th>{idx + 1}</th>
                <th> {e.roomName}</th>
                <th>{e.roomHost}</th>
                <th>{e.roomMember}</th>
              </tr>
            )
          }

        </tbody>
      </Table>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }} >

        <div id="ishave">
          {
            // A ? (B ? C : D) : E
            // id있냐? 없으면 이미지, 있으면 그룹이 있냐? 없으면 이미지, 있으면 아무것도 안보임 

            sessionStorage.getItem("id") === null ? <div><img src={noData} /></div> : <div></div>
          }{
            data && data.map((e) =>
            <tr>
              {
                data[0].roomNum ===0? <div><img src={noData} /></div> : <div></div>
              }
            </tr>
          )
          }

        </div>
      </div>
    </Box>


  )
}

export default Home