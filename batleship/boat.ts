import {Position} from './position';

export class Boat {
    private long: number;
    private dir: string;
    private position: Position[];

    constructor(long: number, dir: string) {
        this.long = long;
        this.dir = dir;
        this.position = []
    }

    public get longB(): number {
        return this.long;
    }

    public get dirB(): string {
        return this.dir;
    }
    public getPosition(): Position[] {
        return [...this.position]; // Devuelve copia del array original
    }


    public setposition(xE: number, yE: number): boolean {
        this.position = []; 
    
        for (let i = 0; i < this.long; i++) {
          let x = xE;
          let y = yE;
    
          if (this.dir === 'vertical') {
            y += i;
          } else if (this.dir === 'horizontal') {
            x += i;
          }
    
          if (x >= 16 || y >= 16) {
            return false; 
          }
    
          this.position.push({ x, y, hit: false });
        }
    
        return true;
      }
    

    public getHitsBoats(x: number, y: number): string {
        for (let i = 0; i < this.long; i++) {
            const pos = this.position[i];
            if (pos.x === x && pos.y === y) {
                this.position[i].hit  = true;
                console.log(`¡Hit! En la posición ${x}, ${y}`)
                return ' ◎ ';
            }
        }
        return ' ⍾ ';
    }
}
