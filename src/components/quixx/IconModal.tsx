import react, { SetStateAction } from "react";

const IconModal = () => {
  return (
    <>
      <button
        className="btn-primary btn"
        onClick={() => {
          if (document) {
            (
              document.getElementById("iconModal") as HTMLFormElement
            ).showModal();
          }
        }}
      >
        open
      </button>
      <dialog id="iconModal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn-secondary btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default IconModal;
