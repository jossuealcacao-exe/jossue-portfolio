const token = process.env.CONTACT_ADMIN_TOKEN?.trim();
const endpoint = process.env.CONTACT_SUBMISSIONS_ENDPOINT?.trim() || 'https://jossuealcala.com/api/submissions';

if (!token) {
	console.error('CONTACT_ADMIN_TOKEN is missing. Add it to .env.api.');
	process.exitCode = 1;
} else {
	const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
	const payload = await response.json();
	if (!response.ok) {
		console.error(`Submissions endpoint returned ${response.status}: ${payload.error ?? 'Unknown error'}`);
		process.exitCode = 1;
	} else {
		console.log(JSON.stringify(payload, null, 2));
	}
}
