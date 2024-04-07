// import { promises as fs } from 'fs';
import { useEffect, useState } from 'react';
import axios from 'axios'
import StoreLocationsList from './components/StoreLocationList';

// async function readJsonFile(filePath) {

//   try {
//     const data = await fs.readFile(filePath, 'utf8');
//     const json = JSON.parse(data);

//     console.log(json);
//   } catch (err) {
//     console.error(err);
//   }
// }

// Replace 'path/to/your/file.json' with the actual file path
// const filePath = './StoreData.json';
// readJsonFile(filePath);

const Stores = () => {
	const [storeLocations, setStoreLocations] = useState([])
	useEffect(() => {
		axios.get('http://localhost:8080/store-data').then(response => {
			// setJsonData(response.data)
			console.log(response)
			setStoreLocations(response.data["RETAIL STORE MASTER LIST"])
		})
	}, [])

	return (
		<div className='list'>
			<h1>Store Locations:</h1>
			<StoreLocationsList locations={storeLocations}/>
		</div>

	)
}

export default Stores