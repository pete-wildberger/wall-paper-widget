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
    this.$addRows.forEach(elem => {
      const el = <Element>elem.parentElement!.parentElement;
      const id: string = el.getAttributeNode('id')!.value;
      const parentRef = document.getElementById(id) as HTMLElement;
      const before = document.getElementById(`${id}-butt`) as HTMLElement;
      elem.addEventListener('click', () => {
        this.addRow(parentRef, before);
      });
    });
  };
  addRow(parentDiv: HTMLElement, buttonRef: HTMLElement): void {
    const labels: string[] = ['Height', 'Width'];
    const elId: number = Array.from(document.getElementsByClassName('meassure')).length;
    const row = document.createElement('div');
    row.setAttribute('id', `id_${elId}`);
    row.classList.add('row');
    row.classList.add('meassure');
    const title = document.createElement('div');
    title.classList.add('col-2');
    const buttonCol = document.createElement('div');
    buttonCol.classList.add('col-2');
    const rm = document.createElement('button');
    rm.addEventListener('click', () => {
      this.removeElement(parentDiv.id, `id_${elId}`);
    });

    buttonCol.appendChild(rm);
    row.appendChild(title);
    for (let index = 0; index < 2; index++) {
      row.appendChild(this.generateInputs(labels[index]));
    }
    row.appendChild(buttonCol);
    parentDiv!.insertBefore(row, buttonRef);
  }

  generateInputs(title: string): HTMLElement {
    const labels: string[] = ['feet', 'inches'];
    const col = document.createElement('div');
    const h = document.createElement('h3');
    const text = document.createTextNode(title);
    h.appendChild(text);
    col.className = 'col-4';
    col.appendChild(h);
    for (let i = 0; i < 2; i++) {
      const span = document.createElement('span');
      span.className = 'col-2';
      const label = document.createElement('label');
      const input = document.createElement('input');
      const text = document.createTextNode(labels[i]);
      input.setAttribute('type', 'number');
      input.setAttribute('name', labels[i]);
      label.setAttribute('for', labels[i]);
      label.appendChild(text);
      span.appendChild(label);
      span.appendChild(input);
      col.appendChild(span);
    }
    return col;
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
