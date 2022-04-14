import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "../styles/AddVaccin.css";
import { useState ,useContext} from 'react';
import { VaccinContext } from '../context/vaccinContext';
export default function AddVaccin() {
  const [open, setOpen] = useState(false);
  const {addVaccin} =useContext(VaccinContext)
  const [date,setDate]=useState("");
  const [hospital,setHospital]=useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddVaccin=()=>{
      addVaccin({hospital,date});
      setOpen(false);
  }

  return (
    <div>
      <Button id="openFormButton" variant="outlined" onClick={handleClickOpen}>
        add new vaccin Session
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="date"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e)=>setDate(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Hospital"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setHospital(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddVaccin}>Add new Vaccin</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}