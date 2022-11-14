
import { Box } from "@mui/material";
import { React, useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import CreateMeetModal from '../Components/CreateMeetModal'
import noData from '../img/NoData.png';



const Sekes = () => {
  const [data, setData] = useState();
  const [meetData, setMeetData] = useState();
  const [starthome, setModal] = useState(false);
  const [roomName, setRoomName] = useState();
  const [ishave, setIsHave] = useState(true);
 
  const ingmeetclick = idx => {
    console.log(idx);
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //그룹 이름
    //클라이언트 그 콘텐츠 
    window.location.href = '/Client/' + room + '/' + idx; //Client/그룹num/회의번호
  }

  useEffect(() => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]);
    console.log(room);

    (async () => {
      try {
        const res = await axios.post('http://192.168.2.65:5000/readMeeting', { //창훈이형 그룹 내 회의 목록
          roomNum: room
        });
        // console.log(res.data);

        console.log("데이터가 있음");

        setData(res.data);
        console.log(res.data);
        setRoomName(res.data[0].roomName);



      } catch (error) {
        console.log(error)
        setIsHave(false);
      }
    })();



    //현재 진행중인 회의 리스트
    (async () => {
      try {
        const ing = await axios.post('http://192.168.2.65:5000/readMeetingRoom', {
          roomNum: room
        });
        // console.log(res.data);
        setMeetData(ing.data);
        setRoomName(ing.data[0].roomName);

      } catch (error) {
        console.log(error)
        
      }
    })();
  }, [])



  return (
    <Box width="100%" display="flex" flexDirection="column" m="20px">
      <CreateMeetModal show={starthome} onHide={() => setModal(false)} />
      <Box display="flex" flexDirection="column" m="20px" >

        <Table striped>
          <thead>
            <tr flexDirection="column">
              <td>
                <h2>{roomName}</h2>
              </td>
              <td bg="right">
              </td>
              <td bg="right">
              </td>
              <td bg="right"> <Button variant="outline-secondary" onClick={() => setModal(true)}>회의 생성</Button></td>
            </tr>

            <tr>
              <th>번호</th>
              <th>회의명</th>
              <th>시간</th>
              <th>관리자</th>
            </tr>
          </thead>

          <tbody>
            {
              meetData && meetData.map((e, idx) =>
                <tr id="test" class="blinking" onClick={() => ingmeetclick(e.meetingRoomNum)}>
                  <th> ing...</th>
                  <th>{e.meetingRoomTitle}</th> {/* 회의 이름 */}
                  <th></th> {/* 회의 종료 날짜 */}
                  <th>{e.meetingRoomHost}</th> {/* 회의 만든 사람 */}
                </tr>
              )
            }

            {
              data && data.map((e, idx) =>
                <tr onClick={() => ingmeetclick(e.roomNum)}>
                  <th> {idx + 1}</th>
                  <th>{e.meetTitle}</th> {/* 회의 이름 */}
                  <th>{e.meetDate}</th> {/* 회의 종료 날짜 */}
                  <th></th>
                </tr>
              )
            }
          </tbody>
        </Table>
        {/* 데이터가 없으면 이미지 보이기 */}
        <div id="noData"> 
            {
              ishave ? <div></div> : <div><img src={noData}/></div>

            }
          
        </div>
      </Box>
    </Box>
  )
}

export default Sekes

