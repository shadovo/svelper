/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	console.log(params.tag);
	return {
		title: params.tag,
	};
}
