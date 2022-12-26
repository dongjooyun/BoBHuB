import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import type { Party } from './NavBar';
import { get } from '../api/API';
import type { FoodType } from '../pages/Admin/components/Restraunt/Foods';

interface MyPartyProps {
  open: boolean;
  handleClose: () => void;
  myPartyList: Party[];
  activeShopList: FoodType[];
}

const MyParty = ({ open, handleClose, myPartyList, activeShopList }: MyPartyProps) => {
  return (
    <Container open={open}>
      <Div>
        <Bar>
          <H3>찜 목록</H3>
          <Button onClick={handleClose}>
            <Close />
          </Button>
        </Bar>
      </Div>
      <ListWrapper>
        {myPartyList.map((party, index) => {
          const date = new Date(party.createdAt);
          const offset = new Date(party.createdAt).getTimezoneOffset() * 60000;
          const dateOffset = new Date(date.getTime() - offset);
          const limit = new Date(dateOffset.setMinutes(dateOffset.getMinutes() + party.timeLimit));
          return (
            <List key={party.partyId}>
              <ImgWrapper>
                <Img src={activeShopList[index].shopPicture} alt="img" />
              </ImgWrapper>
              <Description>
                <Name>{activeShopList[index].name}</Name>
                <Time>모집 종료 시간: {`${limit.getHours()}:${limit.getMinutes()} `}</Time>
                <Paragraph>
                  참여한 인원 {party.likedNum}/{party.partylimit}
                </Paragraph>
              </Description>
            </List>
          );
        })}
      </ListWrapper>
    </Container>
  );
};

export default MyParty;

const Container = styled.div<{ open: boolean }>`
  color: black;
  font-size: 14px;
  width: 350px;
  background-color: white;
  position: absolute;
  top: 100%;
  right: 100px;
  border-radius: 10px;
  z-index: 999;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  max-height: ${({ open }) => (open ? '500px' : 0)};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

const Div = styled.div`
  padding: 5px 0 5px 0;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

const Flex = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px 10px 5px 10px;
  align-items: center;
`;

const Bar = styled(Flex)`
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const Close = styled(CloseIcon)`
  color: lightgray;
  &:hover {
    color: black;
  }
`;

const ListWrapper = styled(Div)`
  max-height: 400px;
  overflow-y: auto;
`;

const List = styled(Flex)`
  width: 100%;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
`;
const ImgWrapper = styled.div`
  width: 70px;
  height: 70px;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Description = styled.div`
  margin-left: 30px;
`;

const Paragraph = styled.p`
  + p {
    margin-top: 10px;
  }
`;

const Name = styled(Paragraph)`
  font-size: 24px;
  font-weight: bold;
`;

const Time = styled(Paragraph)`
  color: red;
  font-size: 10px;
`;

const H3 = styled.h3`
  font-size: 28px;
  font-weight: bolder;
`;
