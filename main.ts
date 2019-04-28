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
      const el = <Element>elem.parentElement!.parentElement;
      console.log(el);
      const id: string = el.getAttributeNode('id')!.value;
      elem.addEventListener('click', () => {
        this.addRow(id, i);
      });
    });
  };
  addRow(parentDiv: string, id: number): void {
    const labels: string[] = ['Height', 'Width'];
    const elId: number = Array.from(document.getElementsByClassName('meassure')).length;
    const row = document.createElement('div');
    const rm = document.createElement('button');
    const before = document.getElementById(`${parentDiv}-butt`);
    row.setAttribute('id', `id_${elId}`);
    rm.setAttribute('onclick', `removeElement('${parentDiv}','id_${elId}')`);
    row.classList.add('row');
    row.classList.add('meassure');
    for (let index = 0; index < 2; index++) {
      row.appendChild(this.generateInputs(labels[index]));
    }
    document.getElementById(parentDiv)!.insertBefore(row, before);
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
