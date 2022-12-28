
export enum Status{
    Default = 'default',
    Active = 'actual',
    Correct = 'correcta',
    Incorrect = 'incorrecta'
}

interface makeLetter{
    makeLetter():void;
}
export interface LetterI{
    text: string;
    status: Status;
    position: number;
}


export class Letter implements LetterI{
    text: string;
    status: Status;
    position: number;



    constructor(text:string, status:Status = Status.Default, position:number = 1) {
        this.text = text;
        this.status = status;
        this.position = position;
    }
}

export interface ParticipateI{
    id?:string;
    active:boolean;
    letters:LetterI[];
    time:number;
    timeClass:string;
    words_ok:number;
    words_ko:number;
    words_remainder:number;
}
export class Participate  implements ParticipateI{
    letters: LetterI[];
    time: number = 90;
    timeClass:string = '';
    words_ok: number = 0;
    words_ko: number = 0;
    words_remainder: number = 0;
    id: string;
    active: boolean = false;

    constructor(id:string = '') {
        const letterBuild = new LetterBuild();
        this.letters = letterBuild.getLetters();
        this.id = id;
        this.words_remainder = this.letters.length;
        
    }
}

export class LetterBuild implements makeLetter {
    dictLetters = ["A","B","C","D","E","F","G","H","I","J","L","M","N","Ñ","O","P","Q","R","S","T","U","V","X","Y","Z",];
    letters:Array<LetterI> = [];
    constructor() {
        this.makeLetter();
    }
    makeLetter(): void {
        this.dictLetters.forEach((chart,index) => {
            let status = Status.Default;
            if(index == 0){
                status = Status.Active;
            }
            const letter = new Letter(chart,status,(index+1));
            this.letters.push(letter);
        })
    }
    getLetters():Array<LetterI>{
        return this.letters;
    }
}