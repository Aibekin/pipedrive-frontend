import cn from 'classnames';
import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addDeal } from './redux/slices/dealSlice';
import { useRef, useEffect, useState } from 'react';
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
	const { register, reset, handleSubmit } = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			jobType: '',
			jobSource: '',
			descr: '',
			address: '',
			city: '',
			state: '',
			zip: '',
			area: '',
			date: '',
			startTime: '',
			endTime: '',
			technician: ''
		},
		mode: 'onChange',
	});

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		pressed();
		dispatch(addDeal(data));
		reset();
	}

	const [classname, setClassname] = useState(["submit", "Submit"]);

	const pressed = () => {
		setTimeout(() => {
			setClassname(["submit", "Submit"]);
		}, 3000)
		setClassname(["submit-active", "Submited"]);
	}

	const [places, setPlaces] = useState(Array.from({ length: 3 }, () => null));
	const inputsRefs = [useRef(null), useRef(null), useRef(null)];

	const handlePlaceSelect = (place, index) => {
		const newPlaces = [...places];
		newPlaces[index] = place;
		setPlaces(newPlaces);
		console.log(`Selected place ${index + 1}:`, place);
	};

	useEffect(() => {
		if (window.google) {
			inputsRefs.forEach((inputRef, index) => {
				const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
					fields: ['geometry', 'name', 'formatted_address']
				});
				autocomplete.addListener('place_changed', () => {
					handlePlaceSelect(autocomplete.getPlace(), index);
				});
			});
		}
	}, [inputsRefs]);

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)} method="post">
				<div className={cn(styles["wrapper"])}>
					<h2 className={cn(styles["title"])}>Client details</h2>
					<div className={cn(styles["row"])}>
						<input type='text' name='firstName' placeholder="First name" required {...register('firstName')} />
						<input type='text' name='lastName' placeholder="Last name" required {...register('lastName')} />
					</div>
					<input type='tel' name='phone' placeholder="Phone" required {...register('phone')} />
					<input type='email' name='email' placeholder="Email" {...register('email')} />
				</div>
				<div className={cn(styles["wrapper"])}>
					<h2 className={cn(styles["title"])}>Job type</h2>
					<div className={cn(styles["row"])}>
						<select name='jobType' required {...register('jobType')}>
							<option value="">Job type</option>
							<option value="recall">Recall Job</option>
						</select>
						<select name='jobSource' required {...register('jobSource')}>
							<option value="">Job source</option>
							<option value="GL Pinellas">GL Pinellas</option>
						</select>
					</div>
					<textarea name='descr' id="" cols="30" rows="2" placeholder="Job description (optional)" {...register('descr')}></textarea>
				</div>
				<div className={cn(styles["wrapper"])}>
					<h2 className={cn(styles["title"])}>Service location</h2>
					<APIProvider>
						<input ref={inputsRefs[0]} type="text" name='address' id="autocomplete" placeholder="Address" required {...register('address')} />
						<input ref={inputsRefs[1]} type="text" name='city' id="city" placeholder="City" required {...register('city')} />
						<input ref={inputsRefs[2]} type="text" name='state' id="state" placeholder="State" required {...register('state')} />
						<div className={cn(styles["row"])}>
							<input type="text" name='zip' id="postal_code" placeholder="Zip code" required {...register('zip')} />
							<select name="Area" required {...register('area')}>
								<option value="Area">Area</option>
							</select>
						</div>
					</APIProvider>
				</div>
				<div className={cn(styles["wrapper"])}>
					<h2 className={cn(styles["title"])}>Scheduled</h2>
					<input type='date' name='date' required {...register('date')} />
					<div className={cn(styles["row"])}>
						<input type="time" name='startTime' required {...register('startTime')} />
						<input type="time" name='endTime' required {...register('endTime')} />
					</div>
					<select name='technician' required {...register('technician')}>
						<option value="">Test</option>
						<option value="Timur Yussupov">Timur Yussupov</option>
					</select>
				</div>
				<button className={cn(styles[classname[0]])} type="submit">{classname[1]}</button>
				<button className={cn(styles["save"])}>Save</button>
			</form>
		</section>
	)
}

export default App;