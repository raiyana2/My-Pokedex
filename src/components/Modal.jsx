import ReactDom from 'react-dom'

//children is whatever we want to show inside the modal
// using modals we create this portal overlay that goes on top of everything else 
//and has specifically the modal content
export function Modal(props) {
  const { children, handleCloseModal } = props
  return ReactDom.createPortal(
    //so we select our document and say, find that div with the id of portal
    //and inject all of these code in there instead of our origina div
    <div className='modal-container'>
      <button onClick={handleCloseModal} className='modal-underlay'/>
      <div className='modal-content'>
         {children} 
      </div>
    
    </div>,
    document.getElementById('portal')
  )

  
}