import {Button, Modal} from "antd";
import React from "react";
import "./style.scss";

const TermsConditionModal = ({state, setState}) => {
	return (
		<Modal
			className="term-condition-modal"
			open={state}
			onCancel={() => setState(false)}
			centered={true}
			transitionName=""
			maskTransitionName=""
			width={826}
			footer={[
				<div key="term-condition-modal" className="modal-footer-button">
					<Button onClick={() => setState(false)}>¡Entendido!</Button>
				</div>,
			]}
		>
			<div className="modal-text">
				<div className="modal-text">
					<h3>Términos y condiciones</h3>
					<p>
						"Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis
						nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum." 
                        "Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad
						minim veniam, quis nostrud exercitation ullamco laboris
						nisi ut aliquip ex ea commodo consequat. Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum
						dolore eu fugiat nulla pariatur. Excepteur sint occaecat
						cupidatat non proident, sunt in culpa qui officia
						deserunt mollit anim id est laborum."
					</p>
				</div>
			</div>
		</Modal>
	);
};

export default TermsConditionModal;
