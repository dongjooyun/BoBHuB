import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  TextFieldProps,
  Button,
} from '@mui/material';
import { useRef } from 'react';
import type { UserType } from './Users';
import styled from 'styled-components';
import { patch } from '../../../../../api/API';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { getUsersData } from '../../../../../store/adminUsersSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface UserDetailFormProps {
  user: UserType;
  handleClose: () => void;
}

const UserDetailForm = ({ user, handleClose }: UserDetailFormProps) => {
  const nickname = useRef<TextFieldProps>();
  const auth = useRef<TextFieldProps>();
  const dispatch = useDispatch<AppDispatch>();

  const updateUserData = (body: { nickname: string; role: string }) => {
    return patch(`/api/admin/users/${user.userId}`, body);
  };

  const clickUpdateBtn = async () => {
    const body = {
      nickname: nickname.current?.value as string,
      role: auth.current?.value as string,
    };
    await updateUserData(body);
    dispatch(getUsersData());
    handleClose();
  };
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        유저 정보
      </Typography>
      <Div>
        <label htmlFor="userName">이름</label>
        <TextField id="userName" type="text" defaultValue={user.name} disabled />
      </Div>
      <Div>
        <label htmlFor="email">이메일</label>
        <TextField id="email" type="text" defaultValue={user.email} disabled />
      </Div>
      <Div>
        <label htmlFor="nickname">닉네임</label>
        <TextField id="nickname" type="text" defaultValue={user.nickname} inputRef={nickname} />
      </Div>
      <Div>
        <label htmlFor="auth">권한</label>
        <Select defaultValue={user.role} inputRef={auth}>
          <MenuItem value="elicer">elicer</MenuItem>
          <MenuItem value="admin">admin</MenuItem>
        </Select>
      </Div>
      <Div>
        <Button variant="outlined" onClick={clickUpdateBtn}>
          수정
        </Button>
      </Div>
    </Box>
  );
};

export default UserDetailForm;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
