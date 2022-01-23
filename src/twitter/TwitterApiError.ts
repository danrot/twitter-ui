export default class TwitterApiError extends Error {
	error: Object;

	constructor(error: Object) {
		super("An error regarding the Twitter API occured!");
		this.error = error;
	}
}
