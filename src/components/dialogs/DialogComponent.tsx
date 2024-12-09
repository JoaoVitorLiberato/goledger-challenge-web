import * as React from 'react'
import { useDispatch } from "react-redux"
import { setDialogCreatePlaylist } from "../../plugins/store/modules/dialogModules"
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { HeaderDialog } from "../../styles/components/dialogs/DialogComponent"
import DialogCreatedAssets from './DialogCreateAssets'

interface IDialogComponent {
  title?:string,
  open: boolean,
  add: string,
  id?: string,
  type?: string,
  children: React.ReactNode,
  close: () => void
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DialogComponent: React.FC<IDialogComponent> = ({ 
  title, add, open, children, close, type, id
}) => {
  const dispatch = useDispatch()

  return (
    <>
      <BootstrapDialog
        disableAutoFocus
        disableEnforceFocus
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }} id="customized-dialog-title"
        >
          <HeaderDialog>
            <span>
              { title }
            </span>

            <div>
              {
                /createPlaylist/i.test(String(add)) &&
                <button
                  onClick={() => (
                    close(),
                    dispatch(setDialogCreatePlaylist(true))
                  )}
                >
                  Adicionar
                </button>
              }
              {
                /createAssets/i.test(String(add)) &&
                <DialogCreatedAssets
                  name={/song/i.test(String(type)) ? "Música" : "Album"}
                  type={String(type)}
                  id={id}
                />
              }
              {
                /update/i.test(String(add)) &&
                <button
                  onClick={() => (
                    close()
                  )}
                >
                  editar
                </button>
              }
            </div>

          </HeaderDialog>
        </DialogTitle>

        <DialogContent 
          dividers
        >
          { children }
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={close}
            color="error"
          >
            Fechar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default DialogComponent