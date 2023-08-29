import { Button, Modal } from 'antd'
import React from 'react'
import './style.scss'

const TermsConditionModal = ({ state, setState }) => {
    return (
        <Modal
            className='term-condition-modal'
            open={state}
            onCancel={() => setState(false)}
            title="Términos y condiciones"
            centered={true}
            transitionName=""
            maskTransitionName=""
            width={826}
            footer={[
                <div key="term-condition-modal" className="modal-footer-button">
                    <Button onClick={() => setState(false)}>
                        ¡Entendido!
                    </Button>
                </div>
            ]}

        >
            <div className="modal-text">
                <div className="modal-text">
                    <h3>Ejemplo de un párrafo</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into electronic typesetting, remaining essentially
                        unchanged. It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing software
                        like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>

        </Modal>
    )
}

export default TermsConditionModal