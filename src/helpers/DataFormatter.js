import groupBy from 'lodash.groupby';
import {fromUnixTime, format} from 'date-fns';

function getGroupedWorkouts(res) {
	const formatted_workouts = res.map(item => {
		const {exercise_id, weight, reps, time_created} = item.data;
		const date = format(fromUnixTime(time_created), 'yyyy-MM-dd');

		return {
			id: item.ref.id,
			exercise_id,
			weight,
			reps,
			date,
			time_created,
		};
	});

	return groupBy(formatted_workouts, 'date');
}

export const groupWorkouts = res => {
	return getGroupedWorkouts(res);
};

export const filterTodaysWorkout = grouped => {
	const today = format(new Date(), 'yyyy-MM-dd');
	return grouped[today] ? grouped[today] : [];
};
