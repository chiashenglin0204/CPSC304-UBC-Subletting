import { Button, TextField, Typography, Grid } from '@mui/material';
import React, { useState } from 'react';
import { deleteApplicationById } from '../../requests/applicationRequest';

//import './Signup.css';

const defaultValues = {
	applicationId: -1,
};

const DeleteApplicationById = () => {
	const [formValues, setFormValues] = useState(defaultValues);

	const handleInputChange = e => {
		let { name, value } = e.target;

		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const res = deleteApplicationById(JSON.stringify(formValues));
		console.log(JSON.stringify(formValues));
		/** TODO: error handling */
		console.log(res);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid container alignItems="center" justify="center" direction="column">
				<Grid item>
					<Typography variant="h3">
						Delete Application By ApplicationId tab
					</Typography>
				</Grid>
				<Grid item>
					<TextField
						id="sid-input"
						name="applicationId"
						label="applicationId"
						type="number"
						value={formValues.applicationId}
						onChange={handleInputChange}
					/>
				</Grid>

				<Button variant="contained" color="primary" type="submit">
					Submit
				</Button>
			</Grid>
		</form>
	);
};

export default DeleteApplicationById;
