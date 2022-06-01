import { ImageContext } from './App';
import { useContext, useState } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import '../styles/FooterNav.css';


const modalStyle = {
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 300,
        maxHeight: 500,
        borderRadius: 8,
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'monospace',
        wordWrap: 'break-word',
        overflow: 'hidden',
    },
  };

Modal.setAppElement('#root');


function FooterNav () {

    const { image } = useContext(ImageContext);

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      subtitle.style.color = 'white';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    const notApplicable = 'n/a';

    return (
        <BrowserRouter>
            <div className='footernavdiv'>         
                <div className='footernav'>
                    <Link to="/" onClick={() => window.location.reload()}><IconButton><HomeIcon fontSize='large'style={{width: 55}}/></IconButton></Link>
                    <IconButton><InfoIcon fontSize='large' style={{width: 55}}/>
                    <div className="notice">
                        <div>
                            <b>This app uses</b>
                            <ul>
                                <li>lukePeavey/quotable API</li>
                                <li>Unsplash API</li>
                                <li>Material UI</li>
                                <li>react-modal</li>
                            </ul>
                        </div>    
                    </div>
                    </IconButton>
                    <a href='https://github.com/sudowr3stl3r' target="_blank" rel="noreferrer"><IconButton title='github'><CodeIcon fontSize='large' style={{width: 55}}/></IconButton></a>
                    <IconButton onClick={openModal} title='image info'><ImageSearchIcon fontSize='large' style={{width: 55}}/>
                    
                        <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={modalStyle}
                        contentLabel="Example Modal"
                        >
                            <div className='modalheader'>
                                <span ref={(_subtitle) => (subtitle = _subtitle)}>Image info</span>
                                <Button onClick={(e)=>{closeModal(); e.stopPropagation();}} variant='contained' size='small' title='close' style={{backgroundColor: 'grey', height: 40, marginLeft: 50}}><CloseIcon/></Button>
                            </div>
                            <hr></hr>
                            <div className='imginfo'>
                                <b>Description:</b>
                                <br/>
                                { Object.keys(image).length === 0 ? notApplicable
                                : image.description === null && image.alt_description === null ? 'no description available'
                                : image.description === null ? image.alt_description : image.description }
                                <br/>
                                <br/>
                                <b>Image by:</b>
                                <br/>
                                { Object.keys(image).length === 0 ? notApplicable : image.user.name }
                                <br/>
                                <br/>
                                <b>Link:</b>
                                { Object.keys(image).length === 0 ? <><br/>{notApplicable}</> :  <a href={image.links.html} target="_blank" rel="noreferrer">{image.links.html}</a> }
                            </div>
                        </Modal>
                        
                    </IconButton>
                </div>
            </div>
        </BrowserRouter>

    );
}

export default FooterNav;