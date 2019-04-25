window.onload = function() {
  const wallPaper = new WallPaper();
  wallPaper.init();
};

class WallPaper {
  modal: HTMLElement;
  btn: HTMLElement;
  span: HTMLElement;

  constructor() {
    // Get the modal
    this.modal = document.getElementById('myModal') as HTMLElement;

    // Get the button that opens the modal
    this.btn = document.getElementById('myBtn') as HTMLElement;

    // Get the <span> element that closes the modal
    this.span = document.getElementsByClassName('close')[0] as HTMLElement;
  }
  init = () => {
    console.log('App start');
    // When the user clicks on the button, open the modal
    this.btn.onclick = () => {
      this.modal.style.display = 'block';
    };

    // When the user clicks on <span> (x), close the modal
    this.span.onclick = () => {
      this.modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = event => {
      if (event.target == this.modal) {
        this.modal.style.display = 'none';
      }
    };
  };
}
