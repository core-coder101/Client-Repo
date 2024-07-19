import React , {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomPopup from '../common/CustomPopup';

export default function FeeManagement() {
    const navigate = useNavigate();
    const { ID } = useParams();

    const [errorMessage, setErrorMessage] = useState("");
    const [popup, setPopup] = useState(false);
    const [FeeData , SetFeeData] = useState('');
    
  const { CSRFToken, user } = useSelector((state) => state.auth);

  if (user.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }

  const StudentGeneratedFee = async (ID) =>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}api/StudentGeneratedFee?ID=${ID}`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );

      if (response.data.success == true) {
        SetFeeData(response.data);
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Reset Password");
      setPopup(true);
    }
  }

  useEffect(()=>{
    StudentGeneratedFee(ID)
  },[ID]);


  const GenerateStudentFeePaid = async (ID , Date) =>{
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}api/GenerateStudentFeePaid`,{
            'ID' : ID,
            'Date' : Date
        },
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );

      if (response.data.success == true) {
        SetFeeData(response.data);
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Mark Fee Paid");
      setPopup(true);
    }
  }

  useEffect(()=>{
    StudentGeneratedFee(ID)
  },[ID]);




  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = FeeData.data ? FeeData.data.map((feedata) => {
    return createData(feedata.users.name, feedata.Fee, feedata.Paid ? "True" : "False" , feedata.Date, <button className='btn btn-primary'  disabled={feedata.Paid} onClick={()=>{GenerateStudentFeePaid(feedata.UsersID , feedata.Date)}}>Mark Paid</button>);
  }) : [];
  
  console.log(rows);
  

//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];

  return (
    <div>
    <div style={{padding: "15px 20px"}}>
      <div className="headingNavbar d-flex justify-content-center">
        <div className="d-flex">
          <FaRegArrowAltCircleLeft
            onClick={() => {
              navigate("/");
            }}
            className="arrow"
          />
          <h4>Dashboard \ Fee Management</h4>
        </div>
        <div className="ms-auto me-4"></div>
      </div>
      </div>
        <div className='' style={{padding: "15px 20px"}}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Amount&nbsp;(PKR)</StyledTableCell>
            <StyledTableCell align="right">Paid&nbsp;(True/False)</StyledTableCell>
            <StyledTableCell align="right">Date&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Action&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className='mt-5 ms-3'>
    <p style={{fontSize:'18px',fontWeight:'700'}}>Total Paid Amount :  &nbsp; {FeeData.totalPaidAmount} pkr</p>
    <p style={{fontSize:'18px',fontWeight:'700'}}>Total UnPaid Amount : &nbsp; {FeeData.totalUnPaidAmount} pkr</p>
    </div>
    </div>
    <CustomPopup
            Visible={popup}
            OnClose={() => {
              setPopup(false);
              setTimeout(() => {
                setErrorMessage("");
              }, 400);
            }}
            errorMessage={errorMessage}
            />
    </div>
  )
}
