const IconModal = () => {
  return (
    <>
      <button
        className="btn btn-primary"
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
            <button className="btn btn-secondary">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default IconModal;
