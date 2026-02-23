import { useState } from 'react';
import './App.css'
import { MoreInfo } from './components/MoreInfo'
import { Quotes } from './components/Quotes'
import { Time } from './components/Time'

function App() {
  const [timezone, setTimezone] = useState<string>('');
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false)

	function getInfo (timeZone: string) {
		setTimezone(timeZone)
	}

	function toggleMoreInfo () {
		setShowMoreInfo(!showMoreInfo)
	}

	return (
		<>
			<Quotes showMoreInfo={showMoreInfo}/>
			<div className={`time-container ${showMoreInfo ? 'shift-up' : ''}`}>
				<Time 
				isMoreOpen={showMoreInfo} 
				toggleMoreInfo={toggleMoreInfo}  
				getInfo={getInfo}
				/>
			</div>
			<div className={`more-info-container ${showMoreInfo ? 'visible' : ''}`}>
				<MoreInfo timezone={timezone} />
			</div>
		</>
  	)
}

export default App
