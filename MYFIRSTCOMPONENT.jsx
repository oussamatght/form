import "./firstcompoent.css"

export default function MYFIRSTCOMPONENT({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Form Submitted Successfully!</h1>
        <p>Thank you for your submission. Our team will contact you soon.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}