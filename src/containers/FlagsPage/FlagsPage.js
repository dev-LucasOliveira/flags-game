import { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { getLocales } from '../../services/flags';
import './FlagsPage.css';
import Countdown, { zeroPad } from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';

export function FlagsPage() {
  const [url, setUrl] = useState();
  const [countryOptions, setCountryOptions] = useState([]);
  const [correctCountry, setCorrectCountry] = useState();
  const [currentPoints, setCurrentPoints] = useState(0);
  const [totalFlags, setTotalFlags] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const [timer, setTimer] = useState(Date.now() + 20000);
  const [renderDate, setRenderDate] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    !url && shouldStart && getRandomFlag();
  }, [url, shouldStart])

  useEffect(() => {
    if (!currentUser.isLogged) navigate('/login');
  }, [currentUser, navigate])

  const getRandomFlag = async () => {
    const locales = [];
    Object.entries(await getLocales()).forEach((locale) => {
      if (!locale[0].match('us-')) {
        locales.push({ label: locale[1], value: locale[0]});
      }
    });

    let randomNumbers = [];
    let randomCountries = [];

    for (let i = 0 ; randomNumbers.length < 4; i++) {
      let randomNumber = Math.floor(Math.random()*locales.length);
      if (!randomNumbers.includes(randomNumber)) {
        randomCountries.push(locales[randomNumber]);
        randomNumbers.push(randomNumber);
      }
    }
    
    const correctNumber = randomNumbers.sort(() => 0.5 - Math.random())[0];

    setUrl(`https://flagcdn.com/w640/${locales[correctNumber].value}.png`);
    setCountryOptions(randomCountries);
    setCorrectCountry(locales[correctNumber]);
    setRenderDate(Date.now());
  }

  const handleSubmit = (guess, correct) => {
    if (guess.value === correct.value) {
      calcPoint();
      addTime();
    }
    setTotalFlags(totalFlags + 1);
    getRandomFlag();
  }

  const calcPoint = () => {
    console.log('currentPoints\n', currentPoints);
    const currentDate = Date.now();
    const timeGap = currentDate - renderDate;
    const newPoints = Math.floor(500000/timeGap);
    setCurrentPoints(currentPoints + newPoints);
  }

  const resetPoints = () => {
    setCurrentPoints(0);
    setTotalFlags(0);
    getRandomFlag();
  }

  const addTime = () => {
    setTimer(timer + 5000);
  }

  const handleLogout = () => {
    const action = logout();
    dispatch(action)
  }

  return (
    <Box className='flagRoot'>
      {/* <Box>
        <img src={currentUser.photoURL}/>
      </Box> */}
      <Box>
        <Button
          key='logout-button'
          sx={{ height: 50, width: 200, fontSize: 20, fontWeight: 600, margin: 2, backgroundColor: '#22333b' }}
          variant="contained"
          onClick={() => handleLogout()}
        >Log out</Button>
        <Button
          key='start-button'
          sx={{ height: 50, width: 200, fontSize: 20, fontWeight: 600, margin: 2, backgroundColor: '#22333b' }}
          variant="contained"
          onClick={() => {
            if (!shouldStart) resetPoints();
            setTimeout(() => {
              setShouldStart(!shouldStart)
            }, 1000);
          }}
        >{shouldStart ? 'Encerrar' : 'Começar'}</Button>
      </Box>
      <Box className='flagContainer'>
        <Box className='centeredSection columnSection'>
          <Countdown
            autoStart={false}
            date={timer}
            onComplete={() => {
              setShouldStart(false);
            }}
            renderer={({ seconds, minutes, api: { start, stop } }) =>
              {
                shouldStart ? start() : stop();
                return <span className='countdown'>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
              }
            }
          />
          <img
            className='flagImg'
            style={{ opacity: shouldStart ? 1 : 0.5 }}
            height={300}
            src={url}
            alt=''
          />
        </Box>
        <Box className='centeredSection columnSection'>
          {countryOptions.length > 0 && countryOptions.map((option) => (
            <Button
              key={option.value}
              sx={{ height: 40, width: 400, marginTop: 2 }}
              variant="contained"
              onClick={() => handleSubmit(option, correctCountry)}
              disabled={!shouldStart}
            >{option.label}</Button>
          ))}
          <Typography sx={{ marginTop: '40px', fontSize: '30px', fontWeight: 600, color: 'white', textAlign: 'center' }}>
            Pontuação: <br/> {currentPoints}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}