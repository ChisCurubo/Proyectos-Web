import { Boat } from './boat';
import * as readline from "readline/promises";
import { Position } from './position';

const prompt = async (message: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(message);
  rl.close();
  return answer;
};

export class Batleship {
  public size: number = 16;
  public tableroJuego: string[][] = [];
  public tableroMaquina: string[][] = [];
  private letrasHusky: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private tableroBotes: Boat[] = [];
  private tableroBotesMa: Boat[] = [];
  private livesMa: number = 15;
  private lives: number = 15;

  public llenarTableroString = (matriz: string[][]): void => {
    for (let i = 0; i < this.size; i++) {
      const arrayLlena: string[] = [];
      for (let j = 0; j < this.size; j++) {
        arrayLlena.push(' . ');
      }
      matriz.push(arrayLlena);
    }
  }

  public llenarArrayBarcosM = (): void => {
    const barcosPredefinidos = [
        { longitud: 5, direccion: 'horizontal', x: 0, y: 0 }, // Barco de longitud 5
        { longitud: 4, direccion: 'vertical', x: 2, y: 3 },  // Barco de longitud 4
        { longitud: 3, direccion: 'horizontal', x: 5, y: 6 }, // Barco de longitud 3
        { longitud: 2, direccion: 'vertical', x: 7, y: 9 },  // Barco de longitud 3
        { longitud: 1, direccion: 'horizontal', x: 9, y: 2 }  // Barco de longitud 2
    ];
    for (const barco of barcosPredefinidos) {
        const boat = new Boat(barco.longitud, barco.direccion);
        const validPosition = boat.setposition(barco.x, barco.y);

        if (validPosition) {
            this.tableroBotesMa.push(boat); 
        } else {
            console.error(`Error al colocar el barco en ${barco.x}, ${barco.y}`);
        }
    }
  }


  // mismo metodo pero con ramdoms
  private llenarBarcosMaquina(): void {
    const direcciones = ['vertical', 'horizontal'];
    for (let i = 0; i < 5; i++) { 
        let validPosition = false;

        while (!validPosition) {
            const direccion = direcciones[Math.floor(Math.random() * direcciones.length)]; 
            const x = Math.floor(Math.random() * this.size); 
            const y = Math.floor(Math.random() * this.size); 

            const boat = new Boat(i, direccion); 
            validPosition = boat.setposition(x, y); 

            if (!validPosition) continue; 

            let collision = false;
            for (const existingBoat of this.tableroBotesMa) {
                for (const pos of existingBoat.getPosition()) {
                    for (const newPos of boat.getPosition()) {
                        if (pos.x === newPos.x && pos.y === newPos.y) {
                            collision = true;
                            break;
                        }
                    }
                    if (collision) break;
                }
                if (collision) break;
            }

            if (!collision) {
                this.tableroBotesMa.push(boat); 
            } else {
                validPosition = false; 
            }
        }
    }
}


    public imprimir_tablero = (matriz: string[][]): void => {
        let base: string = '  '; // Espacio inicial para alineación

        for (const boat of this.tableroBotes) {
            for (const pos of boat.getPosition()) {
                matriz[pos.x][pos.y] = ' ® '; 
            }
        }

        for (let i = 0; i < this.size; i++) {
            const formattedNumber = i < 10 ? ` ${i}` : `${i}`;
            base += ` ${formattedNumber} `;
        }
        console.log(base);
        
        for (let i = 0; i < this.size; i++) {
            let vari: string = this.letrasHusky[i] + ' ';
            for (let j = 0; j < this.size; j++) {
                vari += '|' + matriz[i][j];
            }
            console.log(vari);
        }
    };

    public imprimirTablerosJuego = (matriz: string[][], matrizMa : string[][]): void => {
        let base: string = '  '; // Espacio inicial para alineación
        let base2 : string = '  ';

        for (let i = 0; i < this.size; i++) {
            const formattedNumber = i < 10 ? ` ${i}` : `${i}`;
            base += ` ${formattedNumber} `;
            base2 +=` ${formattedNumber} `
        }
        console.log(base + "           "+ base2);
        
        for (let i = 0; i < this.size; i++) {
            let vari: string = this.letrasHusky[i] + ' ';
            let vari2: string = this.letrasHusky[i] + ' ';
            for (let j = 0; j < this.size; j++) {
                vari += '|' + matriz[i][j];
                vari2 += '|' + matrizMa[i][j];
            }
            console.log(vari+ "           "+ vari2);
        }
    };

   
  public async playBs(): Promise<void> {
    this.llenarTableroString(this.tableroJuego);
    this.llenarTableroString(this.tableroMaquina)
    this.llenarArrayBarcosM()
    this.imprimir_tablero(this.tableroJuego);
    console.log('--------------------------------------------------------');
    console.log('Fill Boats');

    for (let i = 1; i <= 5; i++) {
      let direccion = '';
      const dir: string = await prompt(
        "Chose Direction of boat \nHorizontal :  1  \nVertical: 2\nYour choice: "
      );
      if (Number(dir) === 1) {
        direccion = 'vertical';
      } else if (Number(dir) === 2) {
        direccion = 'horizontal';
      }

      let x: number;
      let y: number;
      let leter: string;
      let validPosition = false;

      while (!validPosition) {
        leter = (await prompt(`barco largo ${i} \nx:  `));
        // for (let j = 0; j < this.letrasHusky.length; j++) {
        //     if (this.letrasHusky[j] === leter) {
        //         x = j; // Se usa directamente el índice
        //         break; // Se puede salir del bucle una vez encontrada la letra
        //     }
        // }
        x = this.letrasHusky.indexOf(leter);
        y = Number(await prompt(`barco largo ${i} \ny:  `));

        const boat = new Boat(i, direccion);
        validPosition = boat.setposition(x, y);

        if (!validPosition) {
          console.log('Posición inválida, inténtalo de nuevo.');
          continue;
        }

        let collision = false;
        for (const existingBoat of this.tableroBotes) {
          for (const pos of existingBoat.getPosition()) {
            for (const newPos of boat.getPosition()) {
              if (pos.x === newPos.x && pos.y === newPos.y) {
                collision = true;
                break;
              }
            }
            if (collision) break;
          }
          if (collision) break;
        }

        if (collision) {
          console.log('Colisión de barcos en ' + x + ' ' + y);
          validPosition = false;
        } else {
          this.tableroBotes.push(boat);
          this.imprimir_tablero(this.tableroJuego);
          console.log('Barco colocado correctamente.');
        }
      }
    }
    this.hitShip()
  }

  

  public async hitShip(): Promise<void> {
    console.log('Now it’s time to hit boats :) \n');
    let x: number;
    let y: number;

    while (this.lives > 0 && this.livesMa > 0) {
        this.imprimirTablerosJuego(this.tableroJuego, this.tableroMaquina);

        // Turno del jugador
        const leter: string = await prompt("Insert letter (x): ");
        x = this.letrasHusky.indexOf(leter);
        y = Number(await prompt("Insert number (y): "));

        if (this.tableroMaquina[x][y] !== ' ◎ ' && this.tableroMaquina[x][y] !== ' ⍾ ') {
            for (const existingBoat of this.tableroBotesMa) {
                const sign: string = existingBoat.getHitsBoats(x, y);
                if (sign === ' ◎ ') {
                    this.livesMa--;
                    this.tableroMaquina[x][y] = sign;
                    break;
                }
            }
            if (this.tableroMaquina[x][y] !== ' ◎ ') {
                this.tableroMaquina[x][y] = ' ⍾ ';
            }
        }

        // Turno de la máquina
        await this.hitShipMachine();
    }

    // Mensaje final
    if (this.livesMa === 0) {
        console.log('You are a Shipper, God blessed America');
    } else if (this.lives === 0) {
        console.log('Machine won');
    }
}

    public async hitShipMachine(): Promise<void> {
        let x: number;
        let y: number;

        // Generar posición aleatoria única
        do {
            x = Math.floor(Math.random() * this.tableroJuego.length);
            y = Math.floor(Math.random() * this.tableroJuego[0].length);
        } while (this.tableroJuego[x][y] === ' ◎ ' || this.tableroJuego[x][y] === ' ⍾ ');

        for (const existingBoat of this.tableroBotes) {
            const sign: string = existingBoat.getHitsBoats(x, y);
            if (sign === ' ◎ ') {
                this.lives--;
                this.tableroJuego[x][y] = sign;
                break;
            }
        }
        // Si no hay impacto
        if (this.tableroJuego[x][y] !== ' ◎ ') {
            this.tableroJuego[x][y] = ' ⍾ ';
        }
        console.log('Machine hit u');
    }
}
