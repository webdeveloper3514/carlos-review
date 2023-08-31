import { Button, Modal } from 'antd'
import React from 'react'
import "./style.scss";
import { Icon } from '../../../config/common';

const BenifitesModal = ({state, setState}) => {
  return (
    <Modal
			className="benifit-modal"
			open={state}
			onCancel={() => setState(false)}
			centered={true}
			transitionName=""
			maskTransitionName=""
			width={826}
			footer={[
				<div key="benifit-modal" className="modal-footer-button">
					<Button
						type="primary"
						onClick={() => setState(false)}>¡Entendido!
					</Button>
				</div>
			]}
		>
			<div className="modal-text">
				<div className="modal-text">
					<h3>Nivel de verificación <Icon /></h3>
                    <h4>Este dato nos permite saber que tu usuario es auténtico.</h4>
                    <p>Tener un nivel de verificación alto te permite</p>
                    <p><Icon />  Evaluaciones ilimitadas</p>
                    <p><Icon />  Realizar comentarios de forma anónima</p>
				</div>
			</div>
		</Modal>
  )
}

export default BenifitesModal