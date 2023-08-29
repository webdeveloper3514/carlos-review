//empty fields validation
export function emptyField(text) {
	if ((text && String(text)?.trim() !== "")) {
		return false;
	} else {
		return true;
	}
}

//invalid email validation
export function inValidEmail(text) {
	const regex = RegExp(/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	return !regex.test(text);
}