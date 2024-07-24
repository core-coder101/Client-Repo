import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import NewRouter from "./components/common/NewRouter";
import { logout,fetchCSRFToken, UserData, setPopup, setError } from "./redux/slices/authSlice";
import { GetTeacherClassinfo, teacherAttendance } from "./redux/slices/Teacher/StudentAttendance";
import { Snackbar } from "@mui/material";
import { setPopup as setPopup2, setError as setError2 } from "./redux/slices/Teacher/StudentAttendance"
import LoadingOverlay from "./components/common/LoadingOverlay";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { showAnnouncement } from "./redux/slices/common/announcement";
import parse from 'html-react-parser';

export default function App() {
  const dispatch = useDispatch();
  const { CSRFToken, rememberMe, loading, error, popup, user } = useSelector((state) => state.auth);
  const { loading: loading2, error: error2, popup: popup2 } = useSelector((state) => state.studentAttendanceTeacher);
  const { announcements, loading: loading3, error: error3, popup: popup3 } = useSelector((state) => state.showAnnouncement);

  useEffect(() => {
    if(!CSRFToken){
    // dispatch(fetchCSRFToken());
  }
  }, [CSRFToken]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!rememberMe) {
        dispatch(logout())
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    };
  }, [rememberMe, dispatch])

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
    
    if (userFromLocalStorage && userFromLocalStorage.token) {
      dispatch(UserData())
      if(userFromLocalStorage.Role === "Teacher"){
        dispatch(GetTeacherClassinfo())
        dispatch(teacherAttendance())
      }
    }
  }, [dispatch]);
  
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(user?.Role === "Student" || user?.Role === "Teacher"){
      dispatch(showAnnouncement())
    }
  }, [user])

  useEffect(() => {
    if(Object.keys(announcements).length > 0){
      setOpen(true)
      console.log("announcements: ", announcements);
    }
  }, [announcements])
  
  return (
    <div>
      <NewRouter />
      <Snackbar
        open={popup2}
        onClose={() => {
          dispatch(setPopup2(false))
        }}
        onAnimationEnd={()=>{
          dispatch(setError2(""))
        }}
        message={error2}
        autoHideDuration={3000}
        transitionDuration={400}
      />
      <Snackbar
        open={popup}
        onClose={() => {
          dispatch(setPopup(false))
        }}
        onAnimationEnd={()=>{
          dispatch(setError(""))
        }}
        message={error}
        autoHideDuration={3000}
        transitionDuration={400}
      />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className="AnnouncementOuterDiv"
      >
        <DialogTitle id="responsive-dialog-title">
          <h1>Announcement 🔊</h1>
        </DialogTitle>
        <DialogContent>
          <h1><strong>{announcements?.heading}</strong></h1>
          {parse(announcements?.description || "")}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
