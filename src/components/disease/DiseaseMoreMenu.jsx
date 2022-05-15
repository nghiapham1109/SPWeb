import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { deleteDisease } from '../../actions/diseaseAction';
import { useDispatch } from 'react-redux';
import { EditDiseaseDialog } from './dialog/editDialog';

// ----------------------------------------------------------------------

export default function DiseaseMoreMenu(props) {
  let [update, setUpdate] = useState(props.updated);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  let [openEdit, setOpenEdit] = useState(false)
  const handleOpenEditDialog = () => {
    setOpenEdit(true);
  }
  const handleCloseEdit = (isSuccessEdit) => {
    setOpenEdit(false);
    props.onClose(isSuccessEdit)
  }
  return (
    <>
      {<EditDiseaseDialog open={openEdit} name={props.name} description={props.description} symptoms={props.symptoms}
        onCloseEdit={handleCloseEdit} id={props.id} />}
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => props.onDelete()}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem to="#" sx={{ color: 'text.secondary' }} onClick={() => { handleOpenEditDialog() }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
