import { Button, Modal } from 'antd'
import React from 'react'
import './style.scss'

const TermsConditionModal = ({state, setState}) => {
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
                <Button onClick={()=> setState(false)}>
                ¡Entendido!
                </Button>
            </div>
            ]}
            
        >
            <div className="modal-text">
                {/* <!DOCTYPE html> */}
                <html lang="es-ES">
                    <head>
                        <meta charset="utf-8" />
                        <title>Ejemplo de un párrafo</title>
                    </head>
                    <body>
                        <p>
                            HHHHHHHHHHHHHH Lorem Ipsum is
                            simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only
                            five centuries, but also the leap into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the release of Letraset sheets
                            containing Lorem Ipsum passages, and more recently with desktop publishing software
                            like Aldus PageMaker including versions of Lorem Ipsum.
                         </p>
                    </body>
                </html>
            </div>

        </Modal>
    )
}

export default TermsConditionModal