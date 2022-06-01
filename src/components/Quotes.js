import { useContext, useState } from 'react';
import quotable from '../api/quotable';
import unsplash from '../api/unsplash';
import '../styles/Quotes.css';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import initBg from '../assets/nathan-dumlao-pnmRtTHWqDM-unsplash.jpg';
import { ImageContext } from './App';


function Quotes () {

    const [ quote, setQuote  ] = useState('');
    const [ query, setQuery ] = useState('');
    const { image, setImage } = useContext(ImageContext);

    const bgImage = async (str) => {
        const imgResponse = await unsplash.get("/search/photos", {
            params: { query: str },
        });
        // console.log('imgResponse:', imgResponse);
        const randomImage = imgResponse.data.results[Math.floor(Math.random()*imgResponse.data.results.length)];
        // console.log('randomImage:', randomImage);
        setImage(randomImage);
    }
        
    const inputChange = e => {
        setQuery(e.target.value);
    };

    const submitForm = e => {
        e.preventDefault();
        if (e.type === 'submit' && query === '') {
            alert('Search for something');
            return;
        }
        getQuotes(query);
        setQuery('');
    }

    const getQuotes = async search => {
        if (search === '') {
            const response = await quotable.get('/random');
            bgImage(response.data.author);
            setQuote(response.data);
        } else {
            const responseItems = await quotable.get(`/search/quotes?query=${search}`);
            if (responseItems.data.results.length === 0) {
                alert(`No quotes found for "${search}"`);
                return;
            }
            const response = responseItems.data.results[Math.floor(Math.random()*responseItems.data.results.length)];
            //console.log('responseItems:', responseItems);
            bgImage(response.author);
            setQuote(response);
        }
    };

    let bg;
    Object.keys(image).length === 0 ? bg = initBg : bg = image.urls.regular

    const emptyResponse = <h3 className='emptyresponse'>no quote yet</h3>;
    const fullResponse = <div className='quotecontent'><h3>Your quote delivered:</h3><p>{quote.content}</p><h4>{quote.author}</h4></div>;
    
    return (
        <div className='quotesroot' style={{backgroundImage: `url(${bg})`}}>
            <h1>Quotes</h1>
            <div className='quotessubdiv'>
                <div className='random'>
                    <Button onClick={submitForm} variant='contained' size='large' title='click for random quote' style={{backgroundColor: '#00A8FF'}} >random quote</Button>
                </div>
                <div className='form'>
                    <form onSubmit={submitForm}>
                        <TextField value={query} onChange={inputChange} label='search quotes' variant='filled' style={{backgroundColor: 'white', zIndex: '0'}} />
                        <Button type='submit' variant='contained' color='success' title='submit' style={{backgroundColor: '#10CD20', height: '100%', marginLeft: 6}}><CheckIcon /></Button>
                    </form>
                </div>
                { quote === '' ?  emptyResponse : fullResponse }
            </div>            
        </div>
    );
}

export default Quotes;