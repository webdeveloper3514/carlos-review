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

export const Icon = ()=>{
	return(
		<span className="icon">
			<svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="12.75" cy="13" r="12.75" fill="#0DC9C2"/>
				<g clip-path="url(#clip0_1945_37127)">
					<path d="M18.167 8.39587L8.95866 18.6667L5.77116 14.4167" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
				</g>
				<defs>
					<clipPath id="clip0_1945_37127">
						<rect width="17" height="17" fill="white" transform="translate(4 4.5)"/>
					</clipPath>
				</defs>
			</svg>
		</span>
	)
}