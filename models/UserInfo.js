class UserInfo {
	constructor({
		email,
		gender,
		phone_number,
		birthdate,
		location,
		username,
		first_name,
		last_name,
		title
	}) {
		this.email = email;
		this.gender = gender;
		this.phone_number = phone_number;
		this.birthdate = birthdate;
		this.location = location;
		this.username = username;
		this.first_name = first_name;
		this.last_name = last_name;
		this.title = title;
	}
	formatData() {
		if (!this.phone_number) this.phone_number = 'nill';
		if (!this.birthdate) this.birthdate = 'nill';
		const locationString = `${this.location.street}, ${this.location.city}, ${this.location.state}.`;
		this.location = locationString;
	}
}

module.exports = UserInfo;
