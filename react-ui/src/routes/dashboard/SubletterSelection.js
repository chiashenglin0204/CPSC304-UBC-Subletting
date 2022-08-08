/* eslint-disable no-unused-vars */
import {
	Button,
	FormControl,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import React, { useState } from 'react';
import { selectApplicationOrListingByName } from '../../requests/subletterSelectionRequest';

const SubletterSelection = () => {
	const defaultValues = {
		isApplication: false,
		selectedName: '',
		listingid: undefined,
		needSid: false,
		needPhoneNum: false,
		needName: false,
		needGender: false,
		needEmail: false,
	};

	const [formValues, setFormValues] = useState(defaultValues);

	const handleSubmit = async event => {
		event.preventDefault();
		selectApplicationOrListingByName(formValues);
	};

	const handleInputChange1 = e => {
		let { name, value } = e.target;

		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<Typography>THIS IS Subletter Selection Tab</Typography>
					<FormControl>
						<RadioGroup
							name="isApplication"
							value={formValues.isApplication}
							onChange={handleInputChange1}
							row
						>
							<FormControlLabel
								key="Application"
								value={true}
								control={<Radio size="small" />}
								label="Application"
							/>
							<FormControlLabel
								key="Listing"
								value={false}
								control={<Radio size="small" />}
								label="Listing"
							/>
						</RadioGroup>
					</FormControl>
				</div>
				<TextField
					id="name-input"
					name="selectedName"
					label="User Name"
					type="text"
					value={formValues.selectedName}
					onChange={handleInputChange1}
				/>
				<div>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									value={formValues.needSid}
									onChange={event => {
										setFormValues({
											...formValues,
											['needSid']: event.target.checked,
										});
									}}
								/>
							}
							label="sid"
						/>
						<FormControlLabel
							control={
								<Checkbox
									value={formValues.needPhoneNum}
									onChange={event => {
										setFormValues({
											...formValues,
											['needPhoneNum']: event.target.checked,
										});
									}}
								/>
							}
							label="phone#"
						/>

						<FormControlLabel
							control={
								<Checkbox
									value={formValues.needGender}
									onChange={event => {
										setFormValues({
											...formValues,
											['needGender']: event.target.checked,
										});
									}}
								/>
							}
							label="gender"
						/>

						<FormControlLabel
							control={
								<Checkbox
									value={formValues.needEmail}
									onChange={event => {
										setFormValues({
											...formValues,
											['needEmail']: event.target.checked,
										});
									}}
								/>
							}
							label="email"
						/>

						<FormControlLabel
							control={
								<Checkbox
									value={formValues.needName}
									onChange={event => {
										setFormValues({
											...formValues,
											['needName']: event.target.checked,
										});
									}}
								/>
							}
							label="userName"
						/>
					</FormGroup>
				</div>
				<div>
					{formValues.isApplication ? (
						<div>
							<TextField
								id="listingid-input"
								name="listingid"
								label="Listing Id"
								type="text"
								value={formValues.listingid}
								onChange={handleInputChange1}
							/>
						</div>
					) : (
						<div></div>
					)}
				</div>
				<Button
					variant="contained "
					onClick={e => {
						handleSubmit(e);
					}}
				>
					{' '}
					Submit
				</Button>
				<div></div>
			</form>
		</div>
	);
};

export default SubletterSelection;
