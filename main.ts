window.onload = function() {
  const wallPaper = new WallPaper(1.5 * 33);
  wallPaper.init();
};
function doMath(i: number): string {
  if (i === 2) {
    return 'two';
  } else {
    return 'three';
  }
}
function elementBuilder(tagName: string, options: { [key: string]: any }): HTMLElement {
  const element: HTMLElement = document.createElement(tagName);
  for (const attr in options) {
    if (attr === 'classList') {
      for (const className of options[attr]) {
        element.classList.add(className);
      }
    } else {
      element.setAttribute(attr, options[attr]);
    }
  }
  return element;
}
function addStyle(elem: HTMLElement, options: { [key: string]: string }): void {
  for (const key in options) {
    elem.style[key] = options[key];
  }
}
class WallPaper {
  roll_area: number;
  $ref: Element;
  $modal: HTMLElement;
  $btn: HTMLElement;
  $span: HTMLElement;
  $calculate: HTMLElement;
  $result: HTMLElement;
  $addRows: Array<Element>;

  constructor(roll_area: number) {
    this.roll_area = roll_area;
    // Get the modal
    this.$modal = document.getElementById('myModal') as HTMLElement;
    this.$ref = document.getElementById('myModal') as Element;
    // Get the button that opens the modal
    this.$btn = document.getElementById('myBtn') as HTMLElement;
    // Get the <span> element that closes the modal
    this.$span = document.getElementsByClassName('close')[0] as HTMLElement;
    this.$addRows = Array.from(this.$ref.getElementsByClassName('addRow'));
    this.$calculate = document.getElementById('calculate') as HTMLElement;
    this.$result = document.getElementById('result') as HTMLElement;
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
    this.$calculate.onclick = () => {
      this.calculateArea();
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
  addRow = (parentDiv: HTMLElement, buttonRef: HTMLElement): void => {
    const labels: string[] = ['Height', 'Width'];
    const elId: number = parentDiv.childElementCount;
    const row = elementBuilder('div', { id: `id_${elId}`, classList: ['row', 'meassure'] });
    const titleCont = elementBuilder('div', { classList: ['col-2', 'one'] });
    addStyle(titleCont, {
      display: 'flex',
      fontFamily: 'sans-serif',
      justifyContent: 'center',
      alignItems: 'center'
    });
    const title = document.createElement('h3');
    title.style.fontWeight = '200';
    const buttonCol = elementBuilder('div', { classList: ['col-2', 'four'] });
    addStyle(buttonCol, { display: 'flex', justifyContent: 'center', alignItems: 'center' });
    const rm = elementBuilder('button', { classList: ['xbutton'] });
    addStyle(rm, {
      color: 'black',
      height: '2rem',
      border: '2px solid black',
      margin: '2%',
      width: '2rem',
      backgroundColor: 'white',
      borderRadius: '50%'
    });
    rm.innerText = '×'.charAt(0);
    rm.addEventListener('click', () => {
      this.removeElement(parentDiv.id, `id_${elId}`);
    });
    buttonCol.appendChild(rm);
    title.innerText = `${parentDiv.id.toUpperCase()} ${elId}`;
    titleCont.appendChild(title);
    row.appendChild(titleCont);
    for (let index = 0; index < 2; index++) {
      row.appendChild(this.generateInputs(labels[index], parentDiv.id, index));
    }
    row.appendChild(buttonCol);
    parentDiv!.insertBefore(row, buttonRef);
  };

  generateInputs(title: string, className: string, i: number): HTMLElement {
    const labels: string[] = ['feet', 'inches'];
    const col = elementBuilder('div', { classList: ['col-4', `${doMath(i + 2)}`] });
    const h = document.createElement('h3');
    h.innerText = title;
    col.appendChild(h);
    for (let i = 0; i < 2; i++) {
      const span = elementBuilder('span', { classList: ['col-2'] });
      const input = elementBuilder('input', {
        type: 'number',
        name: labels[i],
        classList: [className, 'input-style'],
        value: '0'
      });
      const label = elementBuilder('label', { for: labels[i] });
      label.innerText = `${labels[i]}: `;
      span.appendChild(label);
      span.appendChild(input);
      col.appendChild(span);
    }
    return col;
  }
  removeElement = (parentDiv: string, childDiv: string): void => {
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
  };
  validatePairs(a: number, b: number): boolean {
    if (a < 0 || b < 0) {
      alert('Please enter values greater than zero into inputs before continuing');
      return false;
    }
    if (a === 0 && b === 0) {
      alert('Please enter values greater than zero into inputs before continuing');
      return false;
    }
    const str = parseFloat(`${a}`);
    if (!(!isNaN(a) && (str | 0) === str)) {
      alert('Please enter integers into the feet inputs');
      return false;
    }
    return true;
  }
  getArea(inputs: HTMLInputElement[]): number {
    const faces: number[] = [];
    const areas: number[] = [];
    const input_len = inputs.length;
    for (let index = 0; index < input_len; index++) {
      const input = inputs[index];
      if (index % 2 === 0) {
        const feet = input.valueAsNumber * 12;
        const inches = inputs[index + 1].valueAsNumber;
        if (!this.validatePairs(feet, inches)) {
          return 0;
        } else {
          faces.push(feet + inches);
        }
      }
    }
    faces.forEach((val, i, arr) => {
      if (i % 2 === 0) {
        const height = val;
        const width = arr[i + 1];
        if (typeof height === 'number' && typeof width === 'number') {
          areas.push((height / 12) * (width / 12));
        }
      }
    });
    return areas.reduce((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
      }
    });
  }
  getWallArea = () => {
    const wallInputs: HTMLInputElement[] = Array.from(this.$ref.getElementsByClassName('Wall')) as HTMLInputElement[];
    return this.getArea(wallInputs);
  };

  getWindowArea = () => {
    const windowInputs: HTMLInputElement[] = Array.from(
      this.$ref.getElementsByClassName('Window')
    ) as HTMLInputElement[];
    if (windowInputs.length > 0) {
      return this.getArea(windowInputs);
    }
    return 0;
  };
  getDoorArea = () => {
    const doorInputs: HTMLInputElement[] = Array.from(this.$ref.getElementsByClassName('Door')) as HTMLInputElement[];
    if (doorInputs.length > 0) {
      return this.getArea(doorInputs);
    }
    return 0;
  };
  displayResult = (result: string): void => {
    this.$result.innerText = result;
  };
  calculateArea = () => {
    const walls = this.getWallArea();
    const windows = this.getWindowArea();
    const doors = this.getDoorArea();
    const sq_feet = (walls - windows - doors) * 1.1; //plus 10%
    const rolls = Math.ceil(sq_feet / this.roll_area);
    let s: string;
    if (rolls === 1) {
      s = '';
    } else {
      s = 's';
    }
    const result = `You need ${String(rolls)} roll${s}`;
    this.displayResult(result);
  };
}
