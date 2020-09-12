import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import CircularProgress from '@material-ui/core/CircularProgress';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function EditModal(props) {
  const [open, setOpen] = React.useState(props.editForm);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.hideEditForm()
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText component={"div"}>
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={props.disableEdit} onClick={props.onEdit} color="primary"
          endIcon={
            props.editing && <CircularProgress size={25} />
          }>
              Update
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
