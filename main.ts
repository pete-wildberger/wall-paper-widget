window.onload = function() {
  const wallPaper = new WallPaper();
  wallPaper.init();
};

class WallPaper {
  $modal: HTMLElement;
  $btn: HTMLElement;
  $span: HTMLElement;
  $addRows: Array<Element>;

  constructor() {
    // Get the modal
    this.$modal = document.getElementById('myModal') as HTMLElement;
    // Get the button that opens the modal
    this.$btn = document.getElementById('myBtn') as HTMLElement;
    // Get the <span> element that closes the modal
    this.$span = document.getElementsByClassName('close')[0] as HTMLElement;
    this.$addRows = Array.from(document.getElementsByClassName('addRow'));
  }
  init = () => {
    console.log('App start');
    // When the user clicks on the button, open the modal
    this.$btn.onclick = () => {
      this.$modal.style.display = 'block';
    };
    // When the user clicks on <span> (x), close the modal
    this.$span.onclick = () => {
      this.$modal.style.display = 'none';
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = event => {
      if (event.target == this.$modal) {
        this.$modal.style.display = 'none';
      }
    };
    this.$addRows.forEach((elem, i) => {
      const el = <Element>elem.parentElement;
      const id: string = el.getAttributeNode('id')!.value;
      elem.addEventListener('click', () => {
        this.addRow(id, i);
      });
    });
  };
  addRow(parentDiv: string, id: number): void {
    const row = document.createElement('div');
    const rm = document.createElement('button');
    rm.setAttribute('onclick', `removeElement('${parentDiv}','id_${id}')`);
    row.setAttribute('class', 'row');
    document.getElementById(parentDiv)!.appendChild(row);
  }
  removeElement(parentDiv: string, childDiv: string): void {
    if (childDiv === parentDiv) {
      alert('The parent div cannot be removed.');
    } else if (document.getElementById(childDiv)) {
      const child = document.getElementById(childDiv) as HTMLElement;
      const parent = document.getElementById(parentDiv) as HTMLElement;
      parent.removeChild(child);
    } else {
      alert('Child div has already been removed or does not exist.');
      return;
    }
  }
}
