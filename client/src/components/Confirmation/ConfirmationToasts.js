import "./ConfirmationToasts.css";

function ConfirmationToasts(msgConfirmation) {
    const container = document.getElementById("toast-container-confirmation");
    container.insertAdjacentHTML(
        "beforeend",
        `
          <div class="toast show align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="true">
            <div class="d-flex">
              <div class="toast-body">${msgConfirmation}</div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        `
    );
  }
  
  export default ConfirmationToasts;