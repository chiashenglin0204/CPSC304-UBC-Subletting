/* eslint-disable no-unused-vars */
import {
	Button,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import React, { useState, useEffect } from 'react';
import { selectApplicationOrListingByName } from '../../requests/subletterSelectionRequest';

const defaultValues = {
	isApplication: false,
	selectedName: '',
	listingid: undefined,
	attributeSelected: undefined,
	needSid: false,
	needPhoneNum: false,
};

const SubletterSelection = () => {
	//const [isApplication, setApplication] = useState(false);
	//const [isListing, setListing] = useState(false);
	const [isSid, setIsSid] = useState(false);

	const [isPhoneNum, setIsPhoneNum] = useState(false);
	// const [isName, setIsName] = useState(false);
	// const [isEmail, setIsEmail] = useState(false);
	// const [isGender, setIsGender] = useState(false);
	const [formValues, setFormValues] = useState(defaultValues);

	const handleSubmit = async event => {
		event.preventDefault();
		console.log(isSid);
		console.log(isPhoneNum);
		setFormValues(
			...{
				...formValues,
				['needSid']: isSid,
				['needPhoneNum']: isPhoneNum,
			}
		);

		var res = await selectApplicationOrListingByName(formValues);
		console.log(formValues);
		console.log(new URLSearchParams(formValues));
		console.log(JSON.stringify(formValues));
		/** TODO: error handling */
		console.log(res);
	};

	// useEffect(() => {
	// 	// action on update of movies
		
	// }, [la]);

	const handleInputChange1 = e => {
		let { name, value } = e.target;
		// if (name === 'needSid') setIsSid(e.target.checked);
		// if (name === 'needPhoneNum') setIsPhoneNum(e.target.checked);
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	// useEffect(() => {
	// 	setFormValues({
	// 		...formValues,
	// 		['needSid']: !isSid,
	// 	});
	// }, [isSid]);

	// useEffect(() => {
	// 	setFormValues({
	// 		...formValues,
	// 		['needPhoneNum']: !isPhoneNum,
	// 	});
	// }, [isPhoneNum]);

	return (
		<div>
			<div>
				<Typography>THIS IS Subletter Selection Tab</Typography>
				<RadioGroup
					name="isApplication"
					value={formValues.isApplication}
					onChange={handleInputChange1}
					row
				>
					<FormControlLabel
						value="true"
						control={<Radio size="small" />}
						label="Application"
					/>
					<FormControlLabel
						value="false"
						control={<Radio size="small" />}
						label="Listing"
					/>
				</RadioGroup>
			</div>
			<TextField
				id="sid-input"
				name="selectedName"
				label="userName"
				type="text"
				value={formValues.selectedName}
				onChange={handleInputChange1}
			/>
			<div>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={isSid}
								onChange={e => {
									setIsSid(e.target.checked);
								}}
							/>
						}
						label="sid"
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={isPhoneNum}
								onChange={e => {
									setIsPhoneNum(e.target.checked);
								}}
							/>
						}
						label="phone#"
					/>
				</FormGroup>
			</div>

			{/* <div>{isApplication ? <div>i love you</div> : <div>i hate you</div>}</div> */}
			<Button
				variant="contained "
				onClick={e => {
					console.log('here');
					handleSubmit(e);
				}}
			>
				{' '}
				Submit
			</Button>
			<div></div>
		</div>
	);
};

//

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// function DenseTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

export default SubletterSelection;

// boolean [isSid, isPhoneNum, isName, isGender, isEmail, isApplicationId, isListingId, isApplicantId, isIntroduction] = {
//     false, false, false, false, false, false, false, false, false
// }

// isPhoneNum,
// 		isName,
// 		isGender,
// 		isEmail,
// 		isApplicationId,
// 		isListingId,
// 		isApplicantId,
// 		isIntroductionvv
