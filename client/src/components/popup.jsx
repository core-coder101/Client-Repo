import React , {useState} from 'react';
import Popup from 'react-animated-popup';



const PopupExample = () => {
    const [visible, setVisible] = useState(false)
 return(
  <>
  <button className='btn btn-primary'>Open Popup</button>
    <Popup visible={visible} onClose={() => setVisible(false)}>
    <p>I am a popup!</p>
  </Popup>
  </>
 )
};

export default PopupExample;